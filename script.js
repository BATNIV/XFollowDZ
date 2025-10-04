
let orderCounter = 1000;
function startOrder(service, price) {
    const username = prompt('أدخل اسمك:');
    const phone = prompt('أدخل رقم واتساب:');
    if(!username || !phone){alert('يرجى إدخال جميع البيانات'); return;}
    const orderID = 'ORD'+orderCounter++;
    alert(`تم إنشاء الطلب\nالخدمة: ${service}\nالسعر: ${price} USDT\nرقم الطلب: ${orderID}`);
    console.log(`طلب جديد: ${orderID}, المستخدم: ${username}, الخدمة: ${service}, الهاتف: ${phone}`);
    sendWhatsAppNotification(username, phone, service, price, orderID);
}

function sendWhatsAppNotification(name, phone, service, price, orderID){
    console.log(`إرسال رسالة واتساب: ${name} طلب ${service} بسعر ${price} USDT رقم الطلب ${orderID}`);
}
