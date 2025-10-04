let users = [];
let currentUser = null;

function showSection(sectionId){
  document.querySelectorAll('.panel').forEach(sec=> sec.style.display='none');
  if(sectionId==='order') document.getElementById('orderSection').style.display='block';
  if(sectionId==='wallet') document.getElementById('walletSection').style.display='block';
  if(sectionId==='orders') document.getElementById('ordersSection').style.display='block';
  if(sectionId==='profile') document.getElementById('profileSection').style.display='block';
}

function registerUser(){
  let u=document.getElementById('regUser').value;
  let p=document.getElementById('regPass').value;
  if(u && p){
    users.push({username:u,password:p,balance:0});
    alert('تم التسجيل');
  }
}

function loginUser(){
  let u=document.getElementById('loginUser').value;
  let p=document.getElementById('loginPass').value;
  let user=users.find(x=>x.username===u && x.password===p);
  if(user){currentUser=user;alert('تم الدخول');showSection('order');}
  else alert('بيانات غير صحيحة');
}

function logout(){currentUser=null;showSection('authSection');}

function showAdminLogin(){
  showSection('adminLoginSection');
}

function loginAdmin(){
  let u=document.getElementById('adminUser').value;
  let p=document.getElementById('adminPass').value;
  if(u==='baha' && p==='baha2007'){alert('مرحبا أدمن');showSection('order');}
  else alert('بيانات الأدمين غير صحيحة');
}

function verifyTopup(){
  let id=document.getElementById('topupOrderID').value;
  if(id==='12345'){document.getElementById('paymentBox').style.display='block';document.getElementById('payID').innerText='PAY123';document.getElementById('payAmount').innerText='10';document.getElementById('payMethod').innerText='Binance';}
  else alert('رقم الطلب غير صحيح');
}

function copyPayID(){navigator.clipboard.writeText(document.getElementById('payID').innerText);}
