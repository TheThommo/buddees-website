<?php
/**
 * send-lead-email.php
 * Sends nurture sequence emails to leads via Resend API.
 * Called from admin.html lead management.
 *
 * POST body (JSON):
 *   template  - welcome|followup_48h|value_7d|lastchance_14d|custom
 *   name      - Lead's full name
 *   email     - Lead's email address
 *   trade     - Primary trade (optional)
 *   business  - Business name (optional)
 *   subject   - Custom subject (only for template=custom)
 *   body      - Custom body HTML (only for template=custom)
 */

ini_set('display_errors', 0);
error_reporting(E_ALL);

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/_auth.php';

header('Content-Type: application/json');

// CORS — admin only, same-origin with credentials
$allowedOrigins = ['https://buddees.ai', 'https://www.buddees.ai'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins)) {
  header('Access-Control-Allow-Origin: ' . $origin);
  header('Access-Control-Allow-Credentials: true');
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  echo json_encode(['error' => 'POST only']);
  exit;
}

// ── Require admin session ──
requireAdmin();

$input = json_decode(file_get_contents('php://input'), true);
$template = trim($input['template'] ?? '');
$name     = trim($input['name']     ?? '');
$email    = trim($input['email']    ?? '');
$trade    = trim($input['trade']    ?? '');
$business = trim($input['business'] ?? '');
$customSubject = trim($input['subject'] ?? '');
$customBody    = trim($input['body']    ?? '');

if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  echo json_encode(['error' => 'Valid email required']);
  exit;
}

if (!$template) {
  echo json_encode(['error' => 'Template required']);
  exit;
}

$firstName = $name ? explode(' ', $name)[0] : 'there';
$tradeLabel = $trade && $trade !== '-' ? $trade : 'trades';
$bizLabel = $business && $business !== '-' ? $business : 'your business';
$registrationUrl = 'https://app.buddees.app/auth/register';

// ── Email templates ──
$templates = [

  'welcome' => [
    'subject' => "Welcome to Buddees, {$firstName}! Your AI team is standing by",
    'html' => buildEmail($firstName, "Your AI team is ready, {$firstName}.", "
      <p style=\"margin:0 0 16px;color:rgba(255,255,255,0.6);font-size:15px;line-height:1.7\">
        Thanks for checking us out. We built Buddees because we saw {$tradeLabel} businesses losing jobs to missed calls, drowning in admin, and paying too much for marketing that doesn't convert.
      </p>
      <p style=\"margin:0 0 20px;color:rgba(255,255,255,0.6);font-size:15px;line-height:1.7\">
        Your free 14-day trial gives you a full AI team: Tabby handles your calls and scheduling, Jack runs your jobs, Marco does your marketing, and Cassie manages your invoices. No credit card required.
      </p>
    ", $registrationUrl, 'Start Your Free Trial'),
  ],

  'followup_48h' => [
    'subject' => "{$firstName}, your AI team is still waiting",
    'html' => buildEmail($firstName, "Quick check-in, {$firstName}.", "
      <p style=\"margin:0 0 16px;color:rgba(255,255,255,0.6);font-size:15px;line-height:1.7\">
        Just wanted to make sure you saw our invite. Setting up takes about 2 minutes, and your AI team starts working for you straight away.
      </p>
      <p style=\"margin:0 0 16px;color:rgba(255,255,255,0.6);font-size:15px;line-height:1.7\">
        Since you signed up, here's what other {$tradeLabel} businesses using Buddees are seeing in their first month:
      </p>
      <table cellpadding=\"0\" cellspacing=\"0\" style=\"margin:0 0 24px\">
        <tr><td style=\"padding:6px 14px 6px 0;color:#34D399;font-weight:700;font-size:14px\">87%</td>
            <td style=\"color:rgba(255,255,255,0.5);font-size:13px\">fewer missed calls</td></tr>
        <tr><td style=\"padding:6px 14px 6px 0;color:#0066FF;font-weight:700;font-size:14px\">15+ hrs</td>
            <td style=\"color:rgba(255,255,255,0.5);font-size:13px\">of admin time freed up per week</td></tr>
        <tr><td style=\"padding:6px 14px 6px 0;color:#FFB400;font-weight:700;font-size:14px\">\$2,400+</td>
            <td style=\"color:rgba(255,255,255,0.5);font-size:13px\">average monthly savings</td></tr>
      </table>
    ", $registrationUrl, 'Set Up My Account'),
  ],

  'value_7d' => [
    'subject' => "How {$tradeLabel} businesses are saving \$2,400+/month",
    'html' => buildEmail($firstName, "The numbers don't lie.", "
      <p style=\"margin:0 0 16px;color:rgba(255,255,255,0.6);font-size:15px;line-height:1.7\">
        Every missed call is a job that goes to your competitor. Every hour spent on admin is an hour you're not on the tools or growing {$bizLabel}.
      </p>
      <p style=\"margin:0 0 16px;color:rgba(255,255,255,0.6);font-size:15px;line-height:1.7\">
        Here's what Buddees handles for you, 24/7:
      </p>
      <table cellpadding=\"0\" cellspacing=\"0\" style=\"margin:0 0 24px\">
        <tr><td style=\"padding:8px 12px 8px 0;vertical-align:top\">
              <div style=\"width:32px;height:32px;border-radius:8px;background:rgba(0,191,165,0.15);display:flex;align-items:center;justify-content:center;font-size:16px\">📞</div>
            </td>
            <td style=\"padding:8px 0\">
              <div style=\"color:#fff;font-size:13px;font-weight:600;margin-bottom:2px\">Tabby: Never miss a call</div>
              <div style=\"color:rgba(255,255,255,0.4);font-size:12px\">Answers every call, books every job, sends confirmations</div>
            </td></tr>
        <tr><td style=\"padding:8px 12px 8px 0;vertical-align:top\">
              <div style=\"width:32px;height:32px;border-radius:8px;background:rgba(255,59,48,0.15);display:flex;align-items:center;justify-content:center;font-size:16px\">🔧</div>
            </td>
            <td style=\"padding:8px 0\">
              <div style=\"color:#fff;font-size:13px;font-weight:600;margin-bottom:2px\">Jack: Jobs run themselves</div>
              <div style=\"color:rgba(255,255,255,0.4);font-size:12px\">Scheduling, dispatch, compliance tracking</div>
            </td></tr>
        <tr><td style=\"padding:8px 12px 8px 0;vertical-align:top\">
              <div style=\"width:32px;height:32px;border-radius:8px;background:rgba(0,102,255,0.15);display:flex;align-items:center;justify-content:center;font-size:16px\">📣</div>
            </td>
            <td style=\"padding:8px 0\">
              <div style=\"color:#fff;font-size:13px;font-weight:600;margin-bottom:2px\">Marco: Marketing on autopilot</div>
              <div style=\"color:rgba(255,255,255,0.4);font-size:12px\">Social content, reviews, local SEO</div>
            </td></tr>
        <tr><td style=\"padding:8px 12px 8px 0;vertical-align:top\">
              <div style=\"width:32px;height:32px;border-radius:8px;background:rgba(124,58,237,0.15);display:flex;align-items:center;justify-content:center;font-size:16px\">💰</div>
            </td>
            <td style=\"padding:8px 0\">
              <div style=\"color:#fff;font-size:13px;font-weight:600;margin-bottom:2px\">Cassie: Get paid faster</div>
              <div style=\"color:rgba(255,255,255,0.4);font-size:12px\">Instant invoicing, payment tracking, follow-ups</div>
            </td></tr>
      </table>
      <p style=\"margin:0 0 20px;color:rgba(255,255,255,0.6);font-size:15px;line-height:1.7\">
        Want to see exactly how much Buddees could save {$bizLabel}? Try our <a href=\"https://buddees.ai/roi.html\" style=\"color:#0066FF;text-decoration:none;font-weight:600\">free ROI calculator</a>.
      </p>
    ", $registrationUrl, 'Start Free Trial'),
  ],

  'lastchance_14d' => [
    'subject' => "Last call, {$firstName}. Your trial invite expires soon.",
    'html' => buildEmail($firstName, "Your invite is about to expire.", "
      <p style=\"margin:0 0 16px;color:rgba(255,255,255,0.6);font-size:15px;line-height:1.7\">
        Just a heads up: your free trial invite expires in a few days. After that, you'd need to sign up at the standard rate.
      </p>
      <p style=\"margin:0 0 16px;color:rgba(255,255,255,0.6);font-size:15px;line-height:1.7\">
        We get it. You're busy running {$bizLabel}. That's exactly why Buddees exists. Two minutes to set up, and you'll never miss another call or chase another invoice again.
      </p>
      <p style=\"margin:0 0 20px;color:rgba(255,255,255,0.6);font-size:15px;line-height:1.7\">
        No credit card. No contracts. No risk. Just results.
      </p>
    ", $registrationUrl, 'Claim My Free Trial'),
  ],

  'custom' => [
    'subject' => $customSubject ?: "A message from Buddees",
    'html' => buildEmail($firstName, $customSubject ?: "Hello from Buddees", "
      <div style=\"color:rgba(255,255,255,0.6);font-size:15px;line-height:1.7\">{$customBody}</div>
    ", $registrationUrl, 'Visit Buddees'),
  ],
];

if (!isset($templates[$template])) {
  echo json_encode(['error' => 'Unknown template: ' . $template]);
  exit;
}

$tmpl = $templates[$template];

// ── Send via Resend ──
$fromMap = [
  'welcome'        => 'Tabby from Buddees <tabby@buddees.ai>',
  'followup_48h'   => 'Tabby from Buddees <tabby@buddees.ai>',
  'value_7d'       => 'The Buddees Team <team@buddees.ai>',
  'lastchance_14d' => 'Mark from Buddees <mark@buddees.ai>',
  'custom'         => 'The Buddees Team <team@buddees.ai>',
];
$from = $fromMap[$template] ?? RESEND_FROM_EMAIL;

$result = sendResendEmail($from, $email, $tmpl['subject'], $tmpl['html']);

if (isset($result['error'])) {
  http_response_code(500);
  echo json_encode(['error' => 'Failed to send', 'detail' => $result['error']]);
  exit;
}

// Log to notification
sendResendEmail(RESEND_FROM_EMAIL, 'tabby@buddees.ai', "[Nurture] {$template} sent to {$name}", "<div style='font-family:sans-serif;padding:16px;background:#12121e;color:#fff;border-radius:10px'><p><strong>Template:</strong> {$template}</p><p><strong>To:</strong> {$name} ({$email})</p><p><strong>Subject:</strong> {$tmpl['subject']}</p></div>");

echo json_encode(['success' => true, 'template' => $template, 'to' => $email]);


// ── Helper: Resend API ──
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
  if ($httpCode >= 400) return ['error' => $data['message'] ?? "HTTP {$httpCode}"];
  return $data;
}


// ── Helper: Build branded email HTML ──
function buildEmail($firstName, $headline, $bodyContent, $ctaUrl, $ctaLabel) {
  return <<<HTML
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
      {$headline}
    </h1>
  </td></tr>

  <!-- Body -->
  <tr><td style="padding:0 40px 32px">
    {$bodyContent}

    <!-- CTA Button -->
    <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:8px 0 28px">
      <a href="{$ctaUrl}" target="_blank" style="display:inline-block;background:linear-gradient(135deg,#E53116,#164989);color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;padding:14px 40px;border-radius:100px;letter-spacing:-0.01em">
        {$ctaLabel}
      </a>
    </td></tr>
    </table>
  </td></tr>

  <!-- Footer -->
  <tr><td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center">
    <p style="margin:0;color:rgba(255,255,255,0.25);font-size:11px;line-height:1.6">
      Buddees AI &middot; The first AI workforce for the trades<br>
      <a href="https://buddees.ai" style="color:rgba(255,255,255,0.35);text-decoration:none">buddees.ai</a>
      &middot; <a href="mailto:support@buddees.ai" style="color:rgba(255,255,255,0.35);text-decoration:none">support@buddees.ai</a>
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>
HTML;
}
