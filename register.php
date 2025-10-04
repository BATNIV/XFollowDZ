<?php
require 'config.php';
if($_SERVER['REQUEST_METHOD']==='POST'){
    $u = trim($_POST['username']);
    $p = trim($_POST['password']);
    $phone = trim($_POST['phone']);
    $hash = password_hash($p, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare('INSERT INTO users (username,password,phone) VALUES (?,?,?)');
    try{
        $stmt->execute([$u,$hash,$phone]);
        header('Location: login.php');
        exit;
    }catch(Exception $e){
        $error = 'اسم المستخدم موجود';
    }
}
?>
<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>تسجيل</title><link rel="stylesheet" href="style.css"></head><body>
<div class="container"><div class="panel">
<h2>انشاء حساب</h2>
<?php if(isset($error)) echo '<p style="color:#faa">'.htmlspecialchars($error).'</p>'; ?>
<form method="post">
  <input name="username" placeholder="اسم المستخدم" required>
  <input name="password" type="password" placeholder="كلمة المرور" required>
  <input name="phone" placeholder="رقم الهاتف / واتساب">
  <button class="btn" type="submit">انشاء</button>
</form>
</div></div></body></html>