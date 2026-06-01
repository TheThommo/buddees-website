<?php
/**
 * BUDDEES API CONFIGURATION — EXAMPLE
 *
 * Copy this file to config.php and fill in real values.
 * config.php is gitignored and must NEVER be committed.
 *
 * On GoDaddy shared hosting, place config.php in: public_html/api/config.php
 * Alternatively, set values as environment variables (checked first).
 */

// OpenAI
define('OPENAI_API_KEY',    getenv('OPENAI_API_KEY')    ?: 'sk-YOUR_OPENAI_KEY_HERE');

// Airtable
define('AIRTABLE_TOKEN',    getenv('AIRTABLE_TOKEN')    ?: 'patYOUR_AIRTABLE_PAT_HERE');
define('AIRTABLE_BASE_ID',  getenv('AIRTABLE_BASE_ID')  ?: 'appYOUR_BASE_ID_HERE');

// EmailJS (public keys — safe to expose client-side)
define('EMAILJS_PUBLIC_KEY',  'wjI_apyES2dcWfzog');
define('EMAILJS_SERVICE_ID',  'service_sj719fi');
define('EMAILJS_TEMPLATE_ID', 'template_2ckesnk');

// API budget
define('API_BUDGET_USD', 10.00);

// Resend (email)
define('RESEND_API_KEY',    getenv('RESEND_API_KEY')    ?: 're_YOUR_RESEND_KEY_HERE');
define('RESEND_FROM_EMAIL', 'Tabby from Buddees <tabby@buddees.ai>');

// Stripe
define('STRIPE_SECRET_KEY',      getenv('STRIPE_SECRET_KEY')      ?: 'sk_test_YOUR_STRIPE_SECRET_HERE');
define('STRIPE_PUBLISHABLE_KEY', getenv('STRIPE_PUBLISHABLE_KEY') ?: 'pk_test_YOUR_STRIPE_PK_HERE');
define('STRIPE_WEBHOOK_SECRET',  getenv('STRIPE_WEBHOOK_SECRET')  ?: 'whsec_YOUR_WEBHOOK_SECRET_HERE');

// Admin authentication
define('BUDDEES_ADMIN_PASSWORD',    getenv('BUDDEES_ADMIN_PASSWORD')    ?: 'CHANGE_ME_STRONG_PASSWORD');
define('BUDDEES_SUPER_ADMIN_PIN',   getenv('BUDDEES_SUPER_ADMIN_PIN')   ?: 'CHANGE_ME_PIN');
