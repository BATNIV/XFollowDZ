// بيانات مؤقتة للمستخدمين والخدمات (يمكن ربطها بقاعدة بيانات لاحقًا)
let users = [];
let currentUser = null;
let services = [
  {id:1, category:'فيسبوك', name:'متابعين', desc:'متابعين حقيقيين', quantity:100, price:2},
  {id:2, category:'إنستغرام', name:'لايكات', desc:'لايكات للصور', quantity:50, price:1.5},
  {id:3, category:'تيك توك', name:'مشاهدات', desc:'مشاهدات للفيديو', quantity:200, price:3},
];

// عناصر DOM
const sections = {
  auth: document.getElementById('authSection'),
  order: document.getElementById('orderSection'),
  wallet: document.getElementById('walletSection'),
  orders: document.getElementById('ordersSection'),
  profile: document.getElementById('profileSection'),
  admin: document.getElementById('adminLoginSection')
};

const balanceDisplay = document.getElementById('balanceDisplay');
const servicesContainer = document.getElementById('servicesContainer');
const invService = document.getElementById('invService');
const invQuantity = document.getElementById('invQuantity');
const invTotal = document.getElementById('invTotal');
const invoice = document.getElementById('invoice');
const walletBalance = document.getElementById('walletBalance');

// تخزين الطلبات
let currentOrder = [];
let topups = [];
let ordersList = [];

// عرض قسم معين
function showSection(name){
  for(let sec in sections){
    sections[sec].style.display = 'none';
  }
  sections[name].style.display = 'block';
  if(name === 'order') renderServices();
  if(name === 'wallet') updateWalletDisplay();
  if(name === 'orders') renderOrders();
  if(name === 'profile') renderProfile();
}

// تسجيل مستخدم جديد
function registerUser(){
  const username = document.getElementById('regUser').value.trim();
  const password = document.getElementById('regPass').value.trim();
  const phone = document.getElementById('regPhone').value.trim();
  if(!username || !password) return alert('املأ البيانات كاملة');
  if(users.find(u=>u.username===username)) return alert('المستخدم موجود');
  users.push({username,password,phone,balance:0,orders:[],topups:[]});
  alert('تم إنشاء الحساب بنجاح');
}

// تسجيل دخول
function loginUser(){
  const username = document.getElementById('loginUser').value.trim();
  const password = document.getElementById('loginPass').value.trim();
  const user = users.find(u=>u.username===username && u.password===password);
  if(!user) return alert('بيانات خاطئة');
  currentUser = user;
  alert('تم تسجيل الدخول بنجاح');
  showSection('order');
}

// تسجيل خروج
function logout(){
  currentUser = null;
  showSection('auth');
}

// عرض الخدمات
function renderServices(){
  servicesContainer.innerHTML = '';
  services.forEach(s=>{
    const card = document.createElement('div');
    card.className = 'service-card';
    card.innerHTML = `
      <h4>${s.name}</h4>
      <p>${s.desc}</p>
      <p>الكمية: ${s.quantity}</p>
      <p>السعر: $${s.price}</p>
      <button class="btn" onclick="addToOrder(${s.id})">اختيار</button>
    `;
    servicesContainer.appendChild(card);
  });
}

// إضافة خدمة للطلب
function addToOrder(id){
  const service = services.find(s=>s.id===id);
  if(!service) return;
  currentOrder.push(service);
  invService.textContent = currentOrder.map(s=>s.name).join(', ');
  invQuantity.textContent = currentOrder.map(s=>s.quantity).join(', ');
  invTotal.textContent = currentOrder.reduce((sum,s)=>sum+s.price,0).toFixed(2);
  invoice.style.display = 'block';
}

// تأكيد الطلب
function placeOrder(){
  if(!currentUser) return alert('سجل الدخول أولاً');
  const total = currentOrder.reduce((sum,s)=>sum+s.price,0);
  if(currentUser.balance < total) return alert('رصيدك غير كافي');
  currentUser.balance -= total;
  currentUser.orders.push([...currentOrder]);
  alert('تم تأكيد الطلب');
  currentOrder = [];
  invoice.style.display = 'none';
  updateWalletDisplay();
}

// تفريغ الطلب
function clearSelections(){
  currentOrder = [];
  invoice.style.display = 'none';
}

// تحديث عرض الرصيد
function updateWalletDisplay(){
  if(currentUser) walletBalance.textContent = currentUser.balance.toFixed(2);
}

// شحن الرصيد (طلب وهمي لتجربة)
function makeTopUpRequest(){
  if(!currentUser) return alert('سجل الدخول أولاً');
  const amount = parseFloat(document.getElementById('topupAmount').value);
  const method = document.getElementById('topupMethod').value;
  if(!amount || !method) return alert('اختر المبلغ والطريقة');
  const orderID = 'TP'+Math.floor(Math.random()*1000000);
  topups.push({orderID,amount,method,status:'معلق'});
  currentUser.topups.push({orderID,amount,method,status:'معلق'});
  document.getElementById('topupOrderID').textContent = orderID;
  document.getElementById('payID').textContent = 'PAY'+Math.floor(Math.random()*999999);
  document.getElementById('paymentBox').style.display='block';
  alert('تم إنشاء طلب الشحن، استخدم رقم الطلب للدفع');
}

// نسخ رقم الدفع
function copyPayID(){
  const payID = document.getElementById('payID').textContent;
  navigator.clipboard.writeText(payID);
  alert('تم نسخ رقم الدفع');
}

// عرض الطلبات السابقة
function renderOrders(){
  const list = document.getElementById('ordersList');
  list.innerHTML = '';
  if(!currentUser || !currentUser.orders.length) return list.innerHTML='<p>لا توجد طلبات</p>';
  currentUser.orders.forEach((ord,i)=>{
    const div = document.createElement('div');
    div.className = 'invoice';
    div.innerHTML = `<h4>طلب #${i+1}</h4><p>${ord.map(s=>s.name).join(', ')}</p>`;
    list.appendChild(div);
  });
}

// عرض حساب
function renderProfile(){
  if(!currentUser) return;
  document.getElementById('profileName').textContent = currentUser.username;
  document.getElementById('profileBal').textContent = currentUser.balance.toFixed(2);
}

// إدارة الأدمن (تجريبي)
function showAdminLogin(){
  showSection('admin');
}

function closeAdminLogin(){
  showSection('auth');
}

function loginAdmin(){
  const user = document.getElementById('adminUser').value;
  const pass = document.getElementById('adminPass').value;
  if(user==='baha' && pass==='baha2007'){
    alert('تم تسجيل الدخول كأدمين');
  } else alert('بيانات خاطئة');
                          }
