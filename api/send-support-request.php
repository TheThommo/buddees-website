<?php
/**
 * send-support-request.php
 * Logs a support request to Airtable and sends a notification email to tabby@buddees.ai via Resend.
 *
 * POST body (JSON):
 *   name     - Requester's full name
 *   email    - Requester's email address
 *   company  - Business name (optional)
 *   category - Support category
 *   message  - The support message
 */

require_once __DIR__ . '/config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  echo json_encode(['error' => 'POST only']);
  exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$name     = trim($input['name']     ?? '');
$email    = trim($input['email']    ?? '');
$company  = trim($input['company']  ?? '');
$category = trim($input['category'] ?? '');
$message  = trim($input['message']  ?? '');

if (!$name || !$email || !$category || !$message) {
  echo json_encode(['error' => 'Name, email, category, and message are required']);
  exit;
}

// ── Log to Airtable ──
$airtableFields = [
  'Name'     => $name,
  'Email'    => $email,
  'Category' => $category,
  'Message'  => $message,
  'Date'     => date('Y-m-d H:i:s'),
  'Status'   => 'New',
];
if ($company) $airtableFields['Company'] = $company;

$atPayload = json_encode(['fields' => $airtableFields]);
$atUrl = 'https://api.airtable.com/v0/' . AIRTABLE_BASE_ID . '/Support%20Requests';

$ch = curl_init($atUrl);
curl_setopt_array($ch, [
  CURLOPT_POST           => true,
  CURLOPT_POSTFIELDS     => $atPayload,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_HTTPHEADER     => [
    'Authorization: Bearer ' . AIRTABLE_TOKEN,
    'Content-Type: application/json',
  ],
  CURLOPT_TIMEOUT => 10,
]);
$atResponse = curl_exec($ch);
$atCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($atCode >= 400) {
  error_log('[Buddees] Airtable support log failed: ' . $atResponse);
}

// ── Send notification email to Tabby via Resend ──
if (RESEND_API_KEY !== 'YOUR_RESEND_API_KEY_HERE') {
  $companyLine = $company ? "<p style=\"margin:0 0 4px;font-size:14px\"><strong>Company:</strong> {$company}</p>" : '';

  $notifyHtml = <<<HTML
<div style="font-family:sans-serif;padding:24px;background:#12121e;color:#fff;border-radius:12px;max-width:560px">
  <h2 style="margin:0 0 16px;font-size:18px;color:#E53116">New Support Request</h2>
  <p style="margin:0 0 4px;font-size:14px"><strong>Name:</strong> {$name}</p>
  <p style="margin:0 0 4px;font-size:14px"><strong>Email:</strong> <a href="mailto:{$email}" style="color:#60A5FA">{$email}</a></p>
  {$companyLine}
  <p style="margin:0 0 4px;font-size:14px"><strong>Category:</strong> {$category}</p>
  <div style="margin:16px 0 0;padding:16px;background:rgba(255,255,255,0.06);border-radius:10px;border:1px solid rgba(255,255,255,0.1)">
    <p style="margin:0 0 8px;font-size:12px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:0.08em">Message</p>
    <p style="margin:0;font-size:14px;line-height:1.7;color:rgba(255,255,255,0.8);white-space:pre-wrap">{$message}</p>
  </div>
  <p style="margin:16px 0 0;font-size:12px;color:#666">Reply directly to this email to respond to the customer.</p>
</div>
HTML;

  $emailPayload = json_encode([
    'from'     => RESEND_FROM_EMAIL,
    'to'       => ['tabby@buddees.ai'],
    'reply_to' => $email,
    'subject'  => "Support: {$category} from {$name}",
    'html'     => $notifyHtml,
  ]);

  $ch = curl_init('https://api.resend.com/emails');
  curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $emailPayload,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER     => [
      'Authorization: Bearer ' . RESEND_API_KEY,
      'Content-Type: application/json',
    ],
    CURLOPT_TIMEOUT => 10,
  ]);
  $emailResponse = curl_exec($ch);
  $emailCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);

  if ($emailCode >= 400) {
    error_log('[Buddees] Resend support email failed: ' . $emailResponse);
  }
}

echo json_encode(['success' => true, 'message' => 'Support request received']);
