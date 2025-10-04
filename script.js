
let orderCounter = 1000;
const services = [
  {name:'باقة متابعين انستغرام - 1000', price:5},
  {name:'باقة تفاعل تيك توك - 500', price:4},
  {name:'خدمة ترويج منشور', price:3},
  {name:'متابعين تويتر - 500', price:4},
  {name:'متابعين سبوتيفاي - 300', price:3}
];

function displayServices(){
  const container = document.getElementById('services');
  services.forEach(s=>{
    const card = document.createElement('div');
    card.className='service-card';
    card.innerHTML=`<h2>${s.name}</h2><p>سعر الخدمة: ${s.price} USDT</p><button onclick="startOrder('${s.name}',${s.price})">اطلب الآن</button>`;
    container.appendChild(card);
  });
}
displayServices();

function startOrder(service, price){
    const username = prompt('أدخل اسمك:');
    const phone = prompt('أدخل رقم واتساب:');
    if(!username||!phone){alert('يرجى إدخال جميع البيانات'); return;}
    const orderID = 'ORD'+orderCounter++;
    alert(`تم إنشاء الطلب\nالخدمة: ${service}\nالسعر: ${price} USDT\nرقم الطلب: ${orderID}`);
    console.log(`طلب جديد: ${orderID}, المستخدم: ${username}, الخدمة: ${service}, الهاتف: ${phone}`);
    sendWhatsAppNotification(username, phone, service, price, orderID);
}

function sendWhatsAppNotification(name, phone, service, price, orderID){
    console.log(`إشعار واتساب: ${name} طلب ${service} بسعر ${price} USDT رقم الطلب ${orderID}`);
}
