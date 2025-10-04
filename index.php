<?php
session_start();
include 'config.php';
include 'db.php';
$user_logged_in = isset($_SESSION['user_id']);
?>
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Fast10 Services</title>
<link rel="stylesheet" href="assets/style.css">
</head>
<body>
<header>
  <h1>Fast10 — خدمات رقمية</h1>
  <nav>
    <?php if($user_logged_in): ?>
      <a href="services.php">الخدمات</a>
      <a href="order.php">طلب خدمة</a>
      <a href="logout.php">تسجيل الخروج</a>
    <?php else: ?>
      <a href="login.php">تسجيل الدخول</a>
      <a href="register.php">إنشاء حساب</a>
    <?php endif; ?>
  </nav>
</header>

<main>
  <h2>مرحبا بك في Fast10</h2>
  <p>اختر الخدمة التي تريد طلبها من بين الخدمات المتوفرة.</p>
  <a href="services.php" class="btn-pink">عرض الخدمات</a>
</main>

<footer>
  <p>© 2025 Fast10</p>
</footer>
</body>
</html>
