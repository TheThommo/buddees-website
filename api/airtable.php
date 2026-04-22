<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once 'config.php';

header('Content-Type: application/json');
$allowedOrigins = ['https://buddees.ai', 'https://www.buddees.ai'];
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if (in_array($origin, $allowedOrigins)) {
  header('Access-Control-Allow-Origin: ' . $origin);
} else {
  header('Access-Control-Allow-Origin: https://buddees.ai');
}
header('Access-Control-Allow-Methods: GET, POST, PATCH');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

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