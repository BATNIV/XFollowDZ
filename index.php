<?php
require 'config.php';
session_start();

// Sample services seed (if table empty)
$stmt = $pdo->query("SELECT COUNT(*) FROM services");
if($stmt->fetchColumn() == 0){
    $seed = [
        ['فيسبوك','متابعين','متابعين حقيقيين',100,2.00],
        ['إنستغرام','لايكات','لايكات طبيعية',50,1.50],
        ['تيك توك','مشاهدات','مشاهدات لفيديو',200,3.00],
    ];
    $ins = $pdo->prepare("INSERT INTO services (category,name,description,quantity,price) VALUES (?,?,?,?,?)");
    foreach($seed as $s) $ins->execute($s);
}

// get services
$services = $pdo->query('SELECT * FROM services')->fetchAll(PDO::FETCH_ASSOC);
$user = null;
if(isset($_SESSION['user_id'])){
    $user = $pdo->prepare('SELECT * FROM users WHERE id=?');
    $user->execute([$_SESSION['user_id']]);
    $user = $user->fetch(PDO::FETCH_ASSOC);
}
?>
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>XFollowDZ - واجهة</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<header>
  <h1>XFollowDZ</h1>
  <nav>
    <a href="#">الرئيسية</a>
    <a href="#topup">شحن رصيد</a>
    <a href="#orders">طلباتي</a>
    <?php if($user): ?><a href="logout.php">تسجيل خروج (<?=htmlspecialchars($user['username'])?>)</a><?php else: ?><a href="login.php">تسجيل / دخول</a><?php endif; ?>
  </nav>
</header>

<main class="container">
  <section class="panel">
    <h2>خدمات سوشيال ميديا</h2>
    <div class="services">
    <?php foreach($services as $s): ?>
      <div class="service-card">
        <img src="assets/images/default.png" alt="icon">
        <h4><?=htmlspecialchars($s['name'])?></h4>
        <p class="cat"><?=htmlspecialchars($s['category'])?></p>
        <p><?=htmlspecialchars($s['description'])?></p>
        <p>الكمية: <?=intval($s['quantity'])?></p>
        <p class="price">$<?=number_format($s['price'],2)?></p>
        <form method="post" action="place_order.php">
          <input type="hidden" name="service_id" value="<?=intval($s['id'])?>">
          <input type="number" name="quantity" value="1" min="1">
          <button class="btn" type="submit">طلب</button>
        </form>
      </div>
    <?php endforeach; ?>
    </div>
  </section>

  <section id="topup" class="panel">
    <h2>شحن الرصيد</h2>
    <?php if(!$user): ?>
      <p>لازم تسجل الدخول باش تشحن. <a href="login.php">اضغط هنا للتسجيل/تسجيل الدخول</a></p>
    <?php else: ?>
      <p>رصيدك الحالي: <strong><?=number_format($user['balance'],2)?></strong> USDT</p>
      <form method="post" action="create_topup.php">
        <label>المبلغ (USDT)</label>
        <input type="number" name="amount" step="0.01" required>
        <label>الطريقة</label>
        <select name="method">
          <option value="payeer">Payeer</option>
        </select>
        <input type="hidden" name="user_id" value="<?=intval($user['id'])?>">
        <button class="btn">إنشاء طلب شحن</button>
      </form>
    <?php endif; ?>
  </section>

</main>
<footer>© XFollowDZ</footer>
</body>
</html>
