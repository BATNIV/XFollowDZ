<?php
require 'config.php';
session_start();
if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $u = trim($_POST['username']);
    $p = trim($_POST['password']);
    $stmt = $pdo->prepare('SELECT * FROM users WHERE username=?');
    $stmt->execute([$u]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if($user && password_verify($p, $user['password'])){
        $_SESSION['user_id'] = $user['id'];
        header('Location: index.php');
        exit;
    } else {
        $error = 'بيانات خاطئة';
    }
}
?>
<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>تسجيل دخول</title><link rel="stylesheet" href="style.css"></head><body>
<div class="container"><div class="panel">
<h2>تسجيل / دخول</h2>
<?php if(isset($error)) echo '<p style="color:#faa">'.htmlspecialchars($error).'</p>'; ?>
<form method="post">
  <input name="username" placeholder="اسم المستخدم" required>
  <input name="password" type="password" placeholder="كلمة المرور" required>
  <button class="btn" type="submit">دخول</button>
</form>
<p>لم تنشئ حساب؟ <a href="register.php">انشئ حساب</a></p>
</div></div></body></html>