<?php
/**
 * airtable.php — Admin-only Airtable proxy
 *
 * Requires valid admin session. For public writes, use public-lead.php instead.
 */
ini_set('display_errors', 0);
error_reporting(E_ALL);

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/_auth.php';

header('Content-Type: application/json');

// CORS — same-origin admin only, with credentials
$allowedOrigins = ['https://buddees.ai', 'https://www.buddees.ai'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins)) {
  header('Access-Control-Allow-Origin: ' . $origin);
  header('Access-Control-Allow-Credentials: true');
}
header('Access-Control-Allow-Methods: GET, POST, PATCH');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

// ── Require admin session ──
requireAdmin();

$table    = isset($_GET['table']) ? rawurlencode($_GET['table']) : '';
$recordId = isset($_GET['id'])    ? '/' . $_GET['id']        : '';

// Forward any extra query params (e.g. offset for pagination) to Airtable
$forwardParams = [];
foreach ($_GET as $key => $val) {
  if ($key !== 'table' && $key !== 'id') {
    $forwardParams[] = rawurlencode($key) . '=' . rawurlencode($val);
  }
}
$queryString = !empty($forwardParams) ? '?' . implode('&', $forwardParams) : '';

$url = "https://api.airtable.com/v0/" . AIRTABLE_BASE_ID . "/{$table}{$recordId}{$queryString}";

$method = $_SERVER['REQUEST_METHOD'];
$body   = file_get_contents('php://input');

$ch = curl_init($url);
curl_setopt_array($ch, [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST  => $method,
  CURLOPT_HTTPHEADER     => [
    'Content-Type: application/json',
    'Authorization: Bearer ' . AIRTABLE_TOKEN,
  ],
]);
if (in_array($method, ['POST', 'PATCH']) && $body) {
  curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
}
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($httpCode);
echo $response;