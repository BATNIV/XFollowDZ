function placeOrder(serviceName, price) {
    const userName = prompt('أدخل اسمك:');
    const userPhone = prompt('أدخل رقم هاتفك أو واتساب:');

    if(!userName || !userPhone) {
        alert('يرجى إدخال جميع البيانات');
        return;
    }

    alert(`تم إرسال طلبك:\nالخدمة: ${serviceName}\nالسعر: ${price} USDT\nالاسم: ${userName}`);

    sendWhatsAppNotification(userName, userPhone, serviceName, price);
}

function sendWhatsAppNotification(name, phone, service, price) {
    console.log(`إرسال رسالة واتساب: ${name} طلب ${service} بسعر ${price} USDT`);
}