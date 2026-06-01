<?php
/**
 * public-lead.php — Unauthenticated endpoint for public lead capture
 *
 * Strict allowlist of tables and fields. No arbitrary Airtable access.
 * Rate-limited per IP. POST only.
 *
 * Query params:
 *   table  - Must be in the allowlist below
 *   id     - Optional record ID (for PATCH updates to own records)
 *
 * POST body: JSON with fields matching the allowlist for the given table.
 */

ini_set('display_errors', 0);
error_reporting(E_ALL);

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/_auth.php'; // for rateLimitCheck()

// CORS — public pages only
$allowedOrigins = ['https://buddees.ai', 'https://www.buddees.ai'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: ' . (in_array($origin, $allowedOrigins) ? $origin : 'https://buddees.ai'));
header('Access-Control-Allow-Methods: POST, PATCH');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

$method = $_SERVER['REQUEST_METHOD'];
if (!in_array($method, ['POST', 'PATCH'])) {
  http_response_code(405);
  echo json_encode(['error' => 'POST or PATCH only']);
  exit;
}

// ── Rate limit: 30 requests per 60 seconds per IP ──
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
rateLimitCheck('public_lead_' . $ip, 30, 60);

// ── Allowed tables and their writable fields ──
$allowedTables = [
  'Early Access' => [
    'Name', 'Email', 'Trade', 'Country', 'Phone', 'Business Name',
    'Source', 'Agent', 'Location', 'Lead Status', 'Status', 'Submitted', 'Date',
    'State', 'ROI Staff', 'ROI Missed Calls', 'ROI Job Value',
    'ROI Total Savings', 'ROI Break Even', 'ROI Plan', 'Notes',
  ],
  'Page Views' => [
    'Page', 'Referrer', 'User Agent', 'Timestamp', 'Country', 'Trade',
  ],
  'Conversations' => [
    'Name', 'Email', 'Agent', 'Question', 'First Message', 'Last Message',
    'Transcript', 'Messages', 'CTA Shown', 'CTA Converted', 'Voice Call Started',
    'Date', 'Timestamp', 'Trade', 'Cost', 'Token Count',
  ],
  'Voice Calls' => [
    'Name', 'Email', 'Agent', 'Date', 'Duration Seconds', 'Transcript',
    'Status', 'Est Cost', 'Trade', 'Call ID',
  ],
  'ROI Analytics' => [
    'Staff', 'Wage', 'CallsPerDay', 'MissedPerDay', 'JobValue',
    'PostTime', 'Marketing', 'PostCost', 'TotalSavings', 'BreakEven',
    'Plan', 'Date', 'Country', 'Trade', 'State',
  ],
  'Graduate Applications' => [
    'Name', 'Email', 'College', 'Student ID', 'Date', 'Status',
    'University', 'Graduation Year', 'Cover Note',
  ],
  'Support Requests' => [
    'Name', 'Email', 'Category', 'Message', 'Date', 'Status', 'Company',
  ],
];

// ── Parse and validate ──
$table = $_GET['table'] ?? '';
$recordId = isset($_GET['id']) ? '/' . $_GET['id'] : '';

if (!isset($allowedTables[$table])) {
  http_response_code(403);
  echo json_encode(['error' => 'Table not allowed']);
  exit;
}

if ($method === 'PATCH' && !$recordId) {
  http_response_code(400);
  echo json_encode(['error' => 'Record ID required for PATCH']);
  exit;
}

$body = json_decode(file_get_contents('php://input'), true);
if (!$body || !isset($body['fields']) || !is_array($body['fields'])) {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid payload: must include "fields" object']);
  exit;
}

// Strip any fields not in the allowlist
$allowedFields = $allowedTables[$table];
$cleanFields = [];
foreach ($body['fields'] as $key => $val) {
  if (in_array($key, $allowedFields, true)) {
    // Sanitize string values (prevent injection)
    $cleanFields[$key] = is_string($val) ? mb_substr($val, 0, 5000) : $val;
  }
}

if (empty($cleanFields)) {
  http_response_code(400);
  echo json_encode(['error' => 'No valid fields provided']);
  exit;
}

// ── Forward to Airtable ──
$url = 'https://api.airtable.com/v0/' . AIRTABLE_BASE_ID . '/' . rawurlencode($table) . $recordId;

$ch = curl_init($url);
curl_setopt_array($ch, [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST  => $method,
  CURLOPT_POSTFIELDS     => json_encode(['fields' => $cleanFields]),
  CURLOPT_HTTPHEADER     => [
    'Content-Type: application/json',
    'Authorization: Bearer ' . AIRTABLE_TOKEN,
  ],
  CURLOPT_TIMEOUT => 10,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($httpCode);
echo $response;
