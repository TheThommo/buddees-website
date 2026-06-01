<?php
ini_set('display_errors', 0);
error_reporting(E_ALL);

require_once __DIR__ . '/config.php';

// Stripe sends webhooks as raw POST body
$payload = file_get_contents('php://input');
$sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'] ?? '';

// ── Verify Stripe signature (required when webhook secret is configured) ──
if (defined('STRIPE_WEBHOOK_SECRET') && STRIPE_WEBHOOK_SECRET !== '') {
  if (!$sig_header) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing Stripe-Signature header']);
    exit;
  }

  // Parse the Stripe-Signature header
  $sigParts = [];
  foreach (explode(',', $sig_header) as $part) {
    [$k, $v] = explode('=', trim($part), 2);
    $sigParts[$k] = $v;
  }

  $timestamp = $sigParts['t'] ?? '';
  $signature = $sigParts['v1'] ?? '';

  if (!$timestamp || !$signature) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid signature format']);
    exit;
  }

  // Reject if timestamp is more than 5 minutes old (replay attack protection)
  if (abs(time() - intval($timestamp)) > 300) {
    http_response_code(400);
    echo json_encode(['error' => 'Timestamp too old']);
    exit;
  }

  // Compute expected signature
  $signedPayload = $timestamp . '.' . $payload;
  $expected = hash_hmac('sha256', $signedPayload, STRIPE_WEBHOOK_SECRET);

  if (!hash_equals($expected, $signature)) {
    http_response_code(400);
    echo json_encode(['error' => 'Signature verification failed']);
    exit;
  }
}

$event = json_decode($payload, true);

if (!$event || empty($event['type'])) {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid payload']);
  exit;
}

// Handle checkout.session.completed (successful payment)
if ($event['type'] === 'checkout.session.completed') {
  $session = $event['data']['object'];

  $customer_email = $session['customer_email'] ?? $session['customer_details']['email'] ?? '';
  $plan_name      = $session['metadata']['plan'] ?? 'Unknown';
  $amount_total   = isset($session['amount_total']) ? number_format($session['amount_total'] / 100, 2) : '0.00';
  $currency       = strtoupper($session['currency'] ?? 'USD');
  $subscription_id = $session['subscription'] ?? '';
  $customer_id    = $session['customer'] ?? '';

  // Log to Airtable (Early Access table - update existing lead or create new record)
  $airtable_data = [
    'fields' => [
      'Email'        => $customer_email,
      'Source'       => 'Stripe Checkout',
      'Agent'        => 'Payment',
      'Lead Status'  => 'Paid',
      'Submitted'    => date('Y-m-d'),
      'Notes'        => "Plan: {$plan_name} | Amount: {$currency} {$amount_total} | Subscription: {$subscription_id} | Customer: {$customer_id}",
    ]
  ];

  $ch = curl_init('https://api.airtable.com/v0/' . AIRTABLE_BASE_ID . '/Early%20Access');
  curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => json_encode($airtable_data),
    CURLOPT_HTTPHEADER     => [
      'Content-Type: application/json',
      'Authorization: Bearer ' . AIRTABLE_TOKEN,
    ],
  ]);
  curl_exec($ch);
  curl_close($ch);
}

// Handle invoice.payment_failed (failed recurring payment)
if ($event['type'] === 'invoice.payment_failed') {
  $invoice = $event['data']['object'];
  $customer_email = $invoice['customer_email'] ?? '';

  // Log failed payment to Airtable for follow-up
  $airtable_data = [
    'fields' => [
      'Email'        => $customer_email,
      'Source'       => 'Stripe Webhook',
      'Agent'        => 'Payment Failed',
      'Lead Status'  => 'Payment Issue',
      'Submitted'    => date('Y-m-d'),
      'Notes'        => 'Recurring payment failed. Subscription: ' . ($invoice['subscription'] ?? 'N/A'),
    ]
  ];

  $ch = curl_init('https://api.airtable.com/v0/' . AIRTABLE_BASE_ID . '/Early%20Access');
  curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => json_encode($airtable_data),
    CURLOPT_HTTPHEADER     => [
      'Content-Type: application/json',
      'Authorization: Bearer ' . AIRTABLE_TOKEN,
    ],
  ]);
  curl_exec($ch);
  curl_close($ch);
}

// Always respond 200 so Stripe doesn't retry
http_response_code(200);
echo json_encode(['received' => true]);
