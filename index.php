<?php
session_start();
include 'config.php'; // إعدادات قاعدة البيانات

$user_logged_in = isset($_SESSION['user_id']);
$message = '';
$error = '';

// تسجيل الخروج
if(isset($_GET['logout'])){
    session_destroy();
    header("Location: index.php");
    exit;
}

// تسجيل الدخول
if(isset($_POST['login'])){
    $username = $_POST['username'];
    $password = $_POST['password'];
    $stmt = $conn->prepare("SELECT * FROM users WHERE username=?");
    $stmt->bind_param("s",$username);
    $stmt->execute();
    $res = $stmt->get_result();
    $user = $res->fetch_assoc();
    if($user && password_verify($password,$user['password'])){
        $_SESSION['user_id'] = $user['id'];
        $message = "تم تسجيل الدخول بنجاح!";
    } else { $error = "اسم المستخدم أو كلمة المرور غير صحيحة"; }
}

// إنشاء حساب
if(isset($_POST['register'])){
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'],PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO users (username,password,email) VALUES (?,?,?)");
    $stmt->bind_param("sss",$username,$password,$email);
    $stmt->execute();
    $_SESSION['user_id'] = $conn->insert_id;
    $message = "تم إنشاء الحساب بنجاح!";
}

// شحن الرصيد
if(isset($_POST['deposit'])){
    $user_id = $_SESSION['user_id'];
    $amount = $_POST['amount'];
    $method = $_POST['method'];
    $txid = $_POST['txid'];
    $status = 'pending';
    $stmt = $conn->prepare("INSERT INTO transactions (user_id,amount,type,txid,status) VALUES (?,?,?,?,?)");
    $type = 'deposit';
    $stmt->bind_param("idsss",$user_id,$amount,$type,$txid,$status);
    $stmt->execute();
    $message = "تم إرسال طلب الشحن! سيتم الموافقة بعد التأكد.";
}

// طلب خدمة
if(isset($_POST['order'])){
    $user_id = $_SESSION['user_id'];
    $service_id = $_POST['service_id'];
    $quantity = $_POST['quantity'];
    $details = $_POST['details'];
    $txid = $_POST['txid'];
    $service_price = $_POST['service_price'];
    $total_price = $quantity * $service_price;

    $user = $conn->query("SELECT balance FROM users WHERE id=$user_id")->fetch_assoc();

    if($user['balance'] < $total_price){
        $error = "رصيدك غير كافي!";
    } else {
        $conn->query("UPDATE users SET balance = balance - $total_price WHERE id=$user_id");
        $stmt = $conn->prepare("INSERT INTO orders (user_id,service_id,quantity,details,txid,status) VALUES (?,?,?,?,?,?)");
        $status = 'pending';
        $stmt->bind_param("iisiss",$user_id,$service_id,$quantity,$details,$txid,$status);
        $stmt->execute();
        $message = "تم إرسال الطلب بنجاح وتم خصم المبلغ من رصيدك!";
    }
}

// قائمة 50 خدمة نموذجية
$services_list = [
['name'=>'زيادة متابعين Instagram','description'=>'زيادة عدد المتابعين الحقيقيين','price'=>5],
['name'=>'زيادة لايكات Facebook','description'=>'زيادة اللايكات على منشورك بسرعة','price'=>3],
['name'=>'زيادة مشاهدة YouTube','description'=>'زيادة المشاهدات على الفيديو','price'=>4],
['name'=>'زيادة متابعين TikTok','description'=>'زيادة المتابعين لحسابك','price'=>5],
['name'=>'زيادة مشاهدات TikTok','description'=>'زيادة المشاهدات على الفيديو','price'=>2],
['name'=>'رفع تقييم Google','description'=>'زيادة تقييم موقعك على Google','price'=>6],
['name'=>'زيادة مشتركين Telegram','description'=>'زيادة عدد المشتركين للقناة','price'=>4],
['name'=>'زيادة مشاهدات Instagram Reel','description'=>'زيادة المشاهدات على الفيديوهات','price'=>3],
['name'=>'تعليقات YouTube تلقائية','description'=>'زيادة التعليقات على فيديوهاتك','price'=>5],
['name'=>'اشتراكات Newsletter','description'=>'زيادة عدد المشتركين','price'=>2],
// أضف بقية الخدمات حتى تصل إلى 50 بنفس النمط
];
?>

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Fast10 — خدمات رقمية</title>
<style>
body { background:#111; color:#fff; font-family:Arial,sans-serif; margin:0; padding:0; }
header { background:#222; padding:15px; text-align:center; }
header h1 { color:#ff3399; }
nav a { color:#ff3399; margin:0 10px; text-decoration:none; }
main { padding:20px; }
.services-grid { display:grid; grid-template-columns: repeat(auto-fit,minmax(250px,1fr)); gap:15px; }
.service-card { background:#222; padding:15px; border-radius:10px; }
.service-card h3 { color:#ff3399; }
.service-card p { color:#fff; }
.service-card .price { font-weight:bold; color:#ff3399; margin:10px 0; }
form { background:#222; padding:15px; border-radius:10px; margin:20px 0; max-width:500px; }
input, select, textarea, button { width:100%; padding:10px; margin:5px 0; border:none; border-radius:5px; }
button { background:#ff3399; color:#fff; cursor:pointer; }
.error { color:red; text-align:center; }
.success { color:#0f0; text-align:center; }
footer { background:#222; text-align:center; padding:10px; margin-top:20px; }
</style>
</head>
<body>

<header>
<h1>Fast10 — خدمات رقمية</h1>
<nav>
<?php if($user_logged_in): ?>
  <a href="#services">الخدمات</a>
  <a href="#order">طلب خدمة</a>
  <a href="#deposit">شحن الرصيد</a>
  <a href="?logout=1">تسجيل الخروج</a>
<?php else: ?>
  <a href="#login">تسجيل الدخول</a>
  <a href="#register">إنشاء حساب</a>
<?php endif; ?>
</nav>
</header>

<main>
<?php if($error) echo "<p class='error'>$error</p>"; ?>
<?php if($message) echo "<p class='success'>$message</p>"; ?>

<?php if(!$user_logged_in): ?>
<section id="login">
<h2>تسجيل الدخول</h2>
<form method="POST">
  <input type="text" name="username" placeholder="اسم المستخدم" required>
  <input type="password" name="password" placeholder="كلمة المرور" required>
  <button type="submit" name="login">تسجيل الدخول</button>
</form>
</section>

<section id="register">
<h2>إنشاء حساب</h2>
<form method="POST">
  <input type="text" name="username" placeholder="اسم المستخدم" required>
  <input type="email" name="email" placeholder="البريد الإلكتروني" required>
  <input type="password" name="password" placeholder="كلمة المرور" required>
  <button type="submit" name="register">إنشاء الحساب</button>
</form>
</section>
<?php endif; ?>

<section id="services">
<h2>أحدث الخدمات</h2>
<div class="services-grid">
<?php foreach($services_list as $index => $service): ?>
  <div class="service-card">
    <h3><?php echo $service['name']; ?></h3>
    <p><?php echo $service['description']; ?></p>
    <p class="price"><?php echo $service['price']; ?> $</p>
  </div>
<?php endforeach; ?>
</div>
</section>

<?php if($user_logged_in): ?>
<section id="order">
<h2>طلب خدمة</h2>
<form method="POST">
  <label>الخدمة:</label>
  <select name="service_id" required>
    <?php foreach($services_list as $index => $s): ?>
      <option value="<?php echo $index; ?>" data-price="<?php echo $s['price']; ?>">
        <?php echo $s['name']." - ".$s['price']."$"; ?>
      </option>
    <?php endforeach; ?>
  </select>
  <input type="hidden" name="service_price" id="service_price" value="<?php echo $services_list[0]['price']; ?>">
  <input type="number" name="quantity" placeholder="الكمية" min="1" required>
  <textarea name="details" placeholder="تفاصيل الحساب/الرقم" required></textarea>
  <input type="text" name="txid" placeholder="رقم العملية TxID" required>
  <button type="submit" name="order">إرسال الطلب</button>
</form>

<script>
const selectService = document.querySelector('select[name="service_id"]');
const servicePriceInput = document.getElementById('service_price');
selectService.addEventListener('change', function(){
    const price = selectService.options[selectService.selectedIndex].getAttribute('data-price');
    servicePriceInput.value = price;
});
</script>
</section>

<section id="deposit">
<h2>شحن الرصيد</h2>
<form method="POST">
  <input type="number" name="amount" placeholder="المبلغ بالدولار" min="1" required>
  <select name="method" required>
    <option value="Payeer">Payeer</option>
    <option value="Binance">Binance</option>
  </select>
  <input type="text" name="txid" placeholder="رقم العملية TxID" required>
  <button type="submit" name="deposit">إرسال طلب الشحن</button>
</form>
</section>
<?php endif; ?>

</main>

<footer>
<p>© 2025 Fast10</p>
</footer>

</body>
</html>
