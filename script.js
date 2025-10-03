// تسجيل المستخدم
function register(){
  const u=document.getElementById('regUser').value;
  const p=document.getElementById('regPass').value;
  if(u && p){
    localStorage.setItem('xUser',u);
    localStorage.setItem('xPass',p);
    localStorage.setItem('xBalance',0);
    alert('تم إنشاء الحساب! سجل الدخول الآن.');
    showLogin();
  }else alert('املأ كل الحقول');
}

// تسجيل دخول
function login(){
  const u=localStorage.getItem('xUser');
  const p=localStorage.getItem('xPass');
  const lu=document.getElementById('loginUser').value;
  const lp=document.getElementById('loginPass').value;
  if(lu===u && lp===p){
    alert('تم تسجيل الدخول!');
    document.getElementById('loginDiv').style.display='none';
    document.getElementById('registerDiv').style.display='none';
    showOrder();
  }else alert('بيانات غير صحيحة');
}

function showLogin(){document.getElementById('registerDiv').style.display='none';document.getElementById('loginDiv').style.display='block';}
function showRegister(){document.getElementById('loginDiv').style.display='none';document.getElementById('registerDiv').style.display='block';}
function showOrder(){document.getElementById('orderPage').style.display='block';document.getElementById('walletPage').style.display='none';updateBalance();}
function showWallet(){document.getElementById('walletPage').style.display='block';document.getElementById('orderPage').style.display='none';updateBalance();}

// الرصيد
function updateBalance(){
  const b=parseFloat(localStorage.getItem('xBalance'))||0;
  if(document.getElementById('balance'))document.getElementById('balance').innerText=b.toFixed(2);
  if(document.getElementById('balanceOrder'))document.getElementById('balanceOrder').innerText=b.toFixed(2);
}

// شحن
function realTopUp(){
  const amt=parseFloat(document.getElementById('topupAmount').value);
  if(amt<=0)return alert('ادخل مبلغ صالح');
  localStorage.setItem('xBalance',(parseFloat(localStorage.getItem('xBalance'))||0)+amt);
  alert('تمت عملية الشحن يدوياً بقيمة: '+amt+' USDT');
  updateBalance();
}

// إرسال الطلب
function sendOrder(e){
  e.preventDefault();
  const service=document.getElementById('serviceSelect').value;
  const qty=parseInt(document.getElementById('quantitySelect').value);
  const unit=getPrice(service);
  const total=unit*qty;
  let balance=parseFloat(localStorage.getItem('xBalance'))||0;

  if(balance<total) return alert("رصيدك غير كافي!");

  balance-=total;
  localStorage.setItem('xBalance',balance);

  const order={
    id:Date.now(),
    service:service,
    qty:qty,
    total:total
  };

  let orders=JSON.parse(localStorage.getItem('orders')||"[]");
  orders.push(order);
  localStorage.setItem('orders',JSON.stringify(orders));

  alert("تم إرسال الطلب بنجاح!");
  window.open(`https://wa.me/213655643510?text=✅ طلب جديد:%0Aالخدمة: ${service}%0Aالعدد: ${qty}%0Aالإجمالي: ${total}$%0Aرقم الطلب: ${order.id}`);
  updateBalance();
}

// تحديد سعر الخدمة
function getPrice(s){
  if(s==="متابعين فيسبوك")return 0.10;
  if(s==="لايكات فيسبوك")return 0.05;
  if(s==="مشاهدات إنستغرام")return 0.08;
  if(s==="مشاهدات TikTok")return 0.12;
  if(s==="أعضاء تيلغرام")return 0.10;
  if(s==="مشاهدات يوتيوب")return 0.12;
  return 0;
}

// أدمين
function adminLogin(){
  const u=document.getElementById('adminUser').value;
  const p=document.getElementById('adminPass').value;
  if(u==="admin" && p==="12345"){
    document.getElementById('loginAdmin').style.display="none";
    document.getElementById('adminPanel').style.display="block";
    showOrders();
  }else alert("بيانات غير صحيحة");
}

function showOrders(){
  const orders=JSON.parse(localStorage.getItem('orders')||"[]");
  const list=document.getElementById('ordersList');
  list.innerHTML="";
  orders.forEach(o=>{
    const li=document.createElement('li');
    li.innerText=`#${o.id} | ${o.service} | ${o.qty} | ${o.total}$`;
    list.appendChild(li);
  });
}
