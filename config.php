<?php
// Database & payment configuration
$db_host = "fdb1033.awardspace.net";
$db_user = "4691453_xfollowdz";
$db_pass = "RHcoqM1K8sAa-k0m";
$db_name = "4691453_xfollowdz";

// Payeer (مثال) - ضع هنا بيانات حساب Payeer Merchant الحقيقية
define('PAYEER_MERCHANT_ID', 'YOUR_PAYEER_MERCHANT_ID');
define('PAYEER_SECRET_KEY', 'YOUR_PAYEER_SECRET_KEY');
// عنوان الويبهوك الذي تضيفه في لوحة بايرر (مثال)
// https://yourdomain.com/XFollowDZ/webhook.php

try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    die('DB connection error: ' . $e->getMessage());
}
?>