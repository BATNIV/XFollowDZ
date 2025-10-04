XFollowDZ - Package (Real Payeer integration example)

Files included:
- index.php
- style.css
- script.js
- config.php (contains DB config and Payeer placeholders)
- create_topup.php (creates topup and redirects to Payeer)
- webhook.php (Payeer IPN handler - set in Payeer panel)
- check_topup.php (check topup status via JSON)
- place_order.php (use balance to place orders)
- admin.php (view topups)
- db.sql (database schema)

Important steps to make payments work (real):
1) Create Payeer merchant account, get MERCHANT_ID and SECRET_KEY.
2) Put them in config.php (PAYEER_MERCHANT_ID and PAYEER_SECRET_KEY).
3) In Payeer merchant settings, set IPN/webhook URL to:
   https://yourdomain.com/webhook.php
4) Ensure your site is HTTPS (recommended) and reachable publicly.
5) Test in Payeer sandbox/test mode if available.

Security notes:
- Move config.php outside webroot or protect it.
- Implement proper authentication for admin.php and all endpoints.
- Validate & sanitize all inputs in production.
