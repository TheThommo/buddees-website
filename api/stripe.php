<?php
require_once 'config.php';

header('Content-Type: application/json');
$allowedOrigins = ['https://buddees.ai', 'https://www.buddees.ai'];
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
header('Access-Control-Allow-Origin: ' . (in_array($origin, $allowedOrigins) ? $origin : 'https://buddees.ai'));
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['error' => 'POST only']); exit; }

$body = file_get_contents('php://input');
$data = json_decode($body, true);

if (!$data || empty($data['price_id'])) {
  http_response_code(400);
  echo json_encode(['error' => 'Missing price_id']);
  exit;
}

// Map of allowed price IDs to prevent abuse
$allowed_prices = [
  'price_1TI2yIEhEwDJJ24FhkytRRo7', // The Crew monthly
  'price_1TI2yNEhEwDJJ24FXHDzfB6q', // The Crew annual
  'price_1TI2ySEhEwDJJ24F3x2iAqT7', // The A-Team monthly
  'price_1TI2yXEhEwDJJ24Fx2saB8D3', // The A-Team annual
];

if (!in_array($data['price_id'], $allowed_prices)) {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid price']);
  exit;
}

// Build Stripe Checkout Session
$session_data = [
  'mode'        => 'subscription',
  'line_items'  => [['price' => $data['price_id'], 'quantity' => 1]],
  'success_url' => 'https://buddees.ai/thank-you.html?session_id={CHECKOUT_SESSION_ID}',
  'cancel_url'  => 'https://buddees.ai/#pricing',
  'allow_promotion_codes' => 'true',
];

// If email was captured before checkout, pre-fill it
if (!empty($data['email'])) {
  $session_data['customer_email'] = $data['email'];
}

// If plan name passed, store as metadata
if (!empty($data['plan_name'])) {
  $session_data['metadata'] = ['plan' => $data['plan_name']];
  $session_data['subscription_data'] = ['metadata' => ['plan' => $data['plan_name']]];
}

// Build form-encoded body for Stripe API
$postFields = '';
foreach ($session_data as $key => $val) {
  if ($key === 'line_items') {
    foreach ($val as $i => $item) {
      foreach ($item as $k => $v) {
        $postFields .= '&line_items[' . $i . '][' . $k . ']=' . urlencode($v);
      }
    }
  } elseif ($key === 'metadata') {
    foreach ($val as $k => $v) {
      $postFields .= '&metadata[' . $k . ']=' . urlencode($v);
    }
  } elseif ($key === 'subscription_data') {
    foreach ($val['metadata'] as $k => $v) {
      $postFields .= '&subscription_data[metadata][' . $k . ']=' . urlencode($v);
    }
  } else {
    $postFields .= '&' . $key . '=' . urlencode($val);
  }
}
$postFields = ltrim($postFields, '&');

$ch = curl_init('https://api.stripe.com/v1/checkout/sessions');
curl_setopt_array($ch, [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POST           => true,
  CURLOPT_POSTFIELDS     => $postFields,
  CURLOPT_HTTPHEADER     => [
    'Authorization: Bearer ' . STRIPE_SECRET_KEY,
    'Content-Type: application/x-www-form-urlencoded',
  ],
]);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$result = json_decode($response, true);

if ($httpCode >= 400 || empty($result['url'])) {
  http_response_code(500);
  echo json_encode(['error' => 'Failed to create checkout session', 'detail' => $result['error']['message'] ?? 'Unknown error']);
  exit;
}

// Return checkout URL to frontend
echo json_encode(['url' => $result['url']]);
