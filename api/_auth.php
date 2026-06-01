<?php
/**
 * _auth.php — Server-side admin authentication for Buddees Admin Console
 *
 * Endpoints:
 *   POST /api/_auth.php?action=login     { password: "..." }              → sets HttpOnly session cookie
 *   POST /api/_auth.php?action=elevate   { pin: "..." }                   → elevates to super-admin
 *   POST /api/_auth.php?action=logout                                     → destroys session
 *   GET  /api/_auth.php?action=check                                      → { authenticated: true/false, elevated: true/false }
 *
 * Include-mode: other API files can require_once('_auth.php') and call requireAdmin() or requireSuperAdmin().
 */

ini_set('display_errors', 0);
error_reporting(E_ALL);

require_once __DIR__ . '/config.php';

// Session config — secure cookies
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_secure',  1);
ini_set('session.cookie_samesite', 'Strict');
ini_set('session.use_strict_mode', 1);
ini_set('session.name', 'BUDDEES_ADMIN');
session_start();

// ── Guard functions (used by other endpoints via require_once) ──

function isAdmin(): bool {
  return !empty($_SESSION['buddees_admin']) && $_SESSION['buddees_admin'] === true;
}

function isSuperAdmin(): bool {
  return isAdmin() && !empty($_SESSION['buddees_superadmin']) && $_SESSION['buddees_superadmin'] === true;
}

function requireAdmin(): void {
  if (!isAdmin()) {
    http_response_code(401);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Authentication required']);
    exit;
  }
}

function requireSuperAdmin(): void {
  if (!isSuperAdmin()) {
    http_response_code(403);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Super-admin access required']);
    exit;
  }
}

// ── If called directly as an endpoint, handle auth actions ──

if (basename($_SERVER['SCRIPT_FILENAME']) === '_auth.php') {
  header('Content-Type: application/json');

  // CORS for admin (same-origin only, no wildcard)
  $allowedOrigins = ['https://buddees.ai', 'https://www.buddees.ai'];
  $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
  if (in_array($origin, $allowedOrigins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
  }
  header('Access-Control-Allow-Methods: GET, POST');
  header('Access-Control-Allow-Headers: Content-Type');
  header('Access-Control-Allow-Credentials: true');

  if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

  $action = $_GET['action'] ?? '';

  switch ($action) {

    case 'login':
      if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit; }
      $input = json_decode(file_get_contents('php://input'), true);
      $password = $input['password'] ?? '';

      // Rate limit login attempts
      rateLimitCheck('login_' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'), 5, 300);

      if (!defined('BUDDEES_ADMIN_PASSWORD') || $password !== BUDDEES_ADMIN_PASSWORD) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid password']);
        exit;
      }

      // Regenerate session ID to prevent fixation
      session_regenerate_id(true);
      $_SESSION['buddees_admin'] = true;
      $_SESSION['buddees_superadmin'] = false;
      $_SESSION['login_time'] = time();
      $_SESSION['ip'] = $_SERVER['REMOTE_ADDR'] ?? '';

      echo json_encode(['success' => true, 'authenticated' => true]);
      break;

    case 'elevate':
      if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit; }
      requireAdmin();
      $input = json_decode(file_get_contents('php://input'), true);
      $pin = $input['pin'] ?? '';

      if (!defined('BUDDEES_SUPER_ADMIN_PIN') || $pin !== BUDDEES_SUPER_ADMIN_PIN) {
        http_response_code(403);
        echo json_encode(['error' => 'Invalid PIN']);
        exit;
      }

      $_SESSION['buddees_superadmin'] = true;
      echo json_encode(['success' => true, 'elevated' => true]);
      break;

    case 'logout':
      $_SESSION = [];
      if (ini_get('session.use_cookies')) {
        $p = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $p['path'], $p['domain'], $p['secure'], $p['httponly']);
      }
      session_destroy();
      echo json_encode(['success' => true]);
      break;

    case 'check':
      echo json_encode([
        'authenticated' => isAdmin(),
        'elevated'      => isSuperAdmin(),
      ]);
      break;

    default:
      http_response_code(400);
      echo json_encode(['error' => 'Unknown action']);
  }
  exit;
}


// ── Simple file-based rate limiter (no dependencies) ──

function rateLimitCheck(string $key, int $maxAttempts, int $windowSeconds): void {
  $dir = __DIR__ . '/_rate_limit_cache';
  if (!is_dir($dir)) @mkdir($dir, 0700, true);

  $file = $dir . '/' . md5($key) . '.json';
  $now = time();
  $data = [];

  if (file_exists($file)) {
    $data = json_decode(file_get_contents($file), true) ?: [];
    // Prune old entries
    $data = array_filter($data, fn($ts) => ($now - $ts) < $windowSeconds);
  }

  if (count($data) >= $maxAttempts) {
    http_response_code(429);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Too many attempts. Try again later.']);
    exit;
  }

  $data[] = $now;
  file_put_contents($file, json_encode(array_values($data)), LOCK_EX);
}
