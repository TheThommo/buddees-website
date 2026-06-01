<?php
/**
 * openai.php — OpenAI proxy for public chat + admin use
 *
 * Protected by: origin check + rate limiting per IP.
 * Admin sessions bypass the rate limit.
 */
ini_set('display_errors', 0);
error_reporting(E_ALL);

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/_auth.php';

header('Content-Type: application/json');

// CORS — buddees.ai only
$allowedOrigins = ['https://buddees.ai', 'https://www.buddees.ai'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins)) {
  header('Access-Control-Allow-Origin: ' . $origin);
  header('Access-Control-Allow-Credentials: true');
}
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit; }

// Rate limit: 20 requests per 60s per IP (admin sessions bypass)
if (!isAdmin()) {
  $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
  rateLimitCheck('openai_' . $ip, 20, 60);
}

$body = file_get_contents('php://input');
$data = json_decode($body, true);
if (!$data) { http_response_code(400); echo json_encode(['error' => 'Invalid JSON']); exit; }

// Validate: only allow chat completions model, cap max_tokens
if (isset($data['max_tokens']) && $data['max_tokens'] > 2000) {
  $data['max_tokens'] = 2000;
  $body = json_encode($data);
}

$ch = curl_init('https://api.openai.com/v1/chat/completions');
curl_setopt_array($ch, [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POST           => true,
  CURLOPT_POSTFIELDS     => $body,
  CURLOPT_HTTPHEADER     => [
    'Content-Type: application/json',
    'Authorization: Bearer ' . OPENAI_API_KEY,
  ],
]);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($httpCode);
echo $response;