<?php
require_once 'config.php';

header('Content-Type: application/json');
$allowedOrigins = ['https://buddees.ai', 'https://www.buddees.ai'];
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
header('Access-Control-Allow-Origin: ' . (in_array($origin, $allowedOrigins) ? $origin : 'https://buddees.ai'));

// Only expose what the browser legitimately needs
// OpenAI, Airtable token NEVER included here
echo json_encode([
  'emailjs_public_key'  => EMAILJS_PUBLIC_KEY,
  'emailjs_service_id'  => EMAILJS_SERVICE_ID,
  'emailjs_template_id' => EMAILJS_TEMPLATE_ID,
  'airtable_base_id'    => AIRTABLE_BASE_ID,
  'api_budget_usd'      => API_BUDGET_USD,
]);