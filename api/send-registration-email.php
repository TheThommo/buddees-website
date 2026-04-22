<?php
/**
 * send-registration-email.php
 * Sends a branded registration link email via Resend API.
 * Also sends a notification copy to tabby@buddees.ai.
 *
 * POST body (JSON):
 *   name     - Lead's full name
 *   email    - Lead's email address
 *   business - Business name (optional)
 *   trade    - Primary trade (optional)
 *   state    - US state (optional)
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
$business = trim($input['business'] ?? '');
$trade    = trim($input['trade']    ?? '');
$state    = trim($input['state']    ?? '');
$country  = trim($input['country']  ?? 'US');
$phone    = trim($input['phone']    ?? '');
$zip      = trim($input['zip']      ?? '');

if (!$name || !$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  echo json_encode(['error' => 'Name and valid email required']);
  exit;
}

if (RESEND_API_KEY === 'YOUR_RESEND_API_KEY_HERE') {
  echo json_encode(['error' => 'Resend API key not configured']);
  exit;
}

$registrationUrl = 'https://app.buddees.app/auth/register' . ($country ? '?country=' . urlencode($country) : '');

// ── Build the branded HTML email ──
$firstName = explode(' ', $name)[0];
$tradeLine = $trade ? "<p style=\"margin:0 0 4px;color:#999;font-size:14px\">Trade: {$trade}</p>" : '';
$businessLine = $business ? "<p style=\"margin:0 0 4px;color:#999;font-size:14px\">Business: {$business}</p>" : '';
$countryLabel = $country ?: 'US';
$countryLine = "<p style=\"margin:0 0 4px;color:#999;font-size:14px\">Country: {$countryLabel}</p>";
$stateLine = $state ? "<p style=\"margin:0 0 4px;color:#999;font-size:14px\">Location: {$state}" . ($zip ? " {$zip}" : '') . "</p>" : '';
$phoneLine = $phone ? "<p style=\"margin:0 0 4px;color:#999;font-size:14px\">Phone: {$phone}</p>" : '';

$htmlBody = <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a14;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a14;padding:40px 20px">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background:#12121e;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.08)">

  <!-- Header -->
  <tr><td style="padding:32px 40px 24px;text-align:center">
    <img src="https://buddees.ai/logos/buddees-logo-02.png" alt="Buddees" height="36" style="margin-bottom:24px">
    <h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;line-height:1.3">
      Welcome aboard, {$firstName}!
    </h1>
  </td></tr>

  <!-- Body -->
  <tr><td style="padding:0 40px 32px">
    <p style="margin:0 0 20px;color:rgba(255,255,255,0.6);font-size:15px;line-height:1.7">
      Your AI team is ready to get to work. Click the button below to create your account and start your 14-day free trial. No charge until you say go.
    </p>

    <!-- CTA Button -->
    <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:8px 0 28px">
      <a href="{$registrationUrl}" target="_blank" style="display:inline-block;background:linear-gradient(135deg,#E53116,#164989);color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;padding:14px 40px;border-radius:100px;letter-spacing:-0.01em">
        Set Up My Account
      </a>
    </td></tr>
    </table>

    <p style="margin:0 0 20px;color:rgba(255,255,255,0.45);font-size:13px;line-height:1.7">
      What happens next:
    </p>
    <table cellpadding="0" cellspacing="0" style="margin-bottom:20px">
      <tr><td style="padding:0 10px 8px 0;color:rgba(255,255,255,0.3);font-size:13px;vertical-align:top">1.</td>
          <td style="padding:0 0 8px;color:rgba(255,255,255,0.55);font-size:13px;line-height:1.5">Create your account (takes 2 minutes)</td></tr>
      <tr><td style="padding:0 10px 8px 0;color:rgba(255,255,255,0.3);font-size:13px;vertical-align:top">2.</td>
          <td style="padding:0 0 8px;color:rgba(255,255,255,0.55);font-size:13px;line-height:1.5">Tell us about your business so we can configure your AI team</td></tr>
      <tr><td style="padding:0 10px 8px 0;color:rgba(255,255,255,0.3);font-size:13px;vertical-align:top">3.</td>
          <td style="padding:0 0 8px;color:rgba(255,255,255,0.55);font-size:13px;line-height:1.5">Your four agents (Tabby, Jack, Marco, Cassie) start working for you</td></tr>
    </table>

    <p style="margin:0;color:rgba(255,255,255,0.35);font-size:12px;line-height:1.6">
      If you didn't request this, you can safely ignore this email.
    </p>
  </td></tr>

  <!-- Footer -->
  <tr><td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center">
    <p style="margin:0;color:rgba(255,255,255,0.25);font-size:11px;line-height:1.6">
      Buddees AI &middot; The first AI workforce for the trades<br>
      <a href="https://buddees.ai" style="color:rgba(255,255,255,0.35);text-decoration:none">buddees.ai</a>
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>
HTML;

// ── Send to the lead via Resend ──
$result = sendResendEmail(RESEND_FROM_EMAIL, $email, "Set up your Buddees account, {$firstName}", $htmlBody);

if (isset($result['error'])) {
  http_response_code(500);
  echo json_encode(['error' => 'Failed to send email', 'detail' => $result['error']]);
  exit;
}

// ── Send notification copy to Tabby ──
$detailLines = array_filter([$businessLine, $tradeLine, $countryLine, $stateLine, $phoneLine]);
$detailBlock = implode("\n", $detailLines);

$tabbyHtml = <<<HTML
<div style="font-family:sans-serif;padding:20px;background:#12121e;color:#fff;border-radius:12px">
  <h2 style="margin:0 0 12px;font-size:18px;color:#E53116">New Trial Signup</h2>
  <p style="margin:0 0 4px;font-size:14px"><strong>Name:</strong> {$name}</p>
  <p style="margin:0 0 4px;font-size:14px"><strong>Email:</strong> {$email}</p>
  {$detailBlock}
  <p style="margin:16px 0 0;font-size:12px;color:#999">Registration email sent. Waiting for them to click through.</p>
</div>
HTML;

sendResendEmail(RESEND_FROM_EMAIL, 'tabby@buddees.ai', "New trial signup: {$name}", $tabbyHtml);

echo json_encode(['success' => true, 'message' => 'Registration email sent']);

// ── Helper: send via Resend API ──
function sendResendEmail($from, $to, $subject, $htmlBody) {
  $payload = json_encode([
    'from'    => $from,
    'to'      => [$to],
    'subject' => $subject,
    'html'    => $htmlBody,
  ]);

  $ch = curl_init('https://api.resend.com/emails');
  curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER     => [
      'Authorization: Bearer ' . RESEND_API_KEY,
      'Content-Type: application/json',
    ],
    CURLOPT_TIMEOUT        => 10,
  ]);

  $response = curl_exec($ch);
  $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  $error    = curl_error($ch);
  curl_close($ch);

  if ($error) return ['error' => "cURL error: {$error}"];

  $data = json_decode($response, true);
  if ($httpCode >= 400) {
    return ['error' => $data['message'] ?? "HTTP {$httpCode}"];
  }

  return $data;
}
