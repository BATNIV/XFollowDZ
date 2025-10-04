
function verifyTopup(){
  let orderID = document.getElementById('topupOrderID').value;
  let fakeDB = {"12345":{amount:10,method:"Binance"}, "54321":{amount:20,method:"Payeer"}};
  if(fakeDB[orderID]){
    document.getElementById('payID').innerText = orderID;
    document.getElementById('payAmount').innerText = fakeDB[orderID].amount;
    document.getElementById('payMethod').innerText = fakeDB[orderID].method;
    document.getElementById('paymentBox').style.display='block';
    document.getElementById('payStatus').innerText="تم التحقق بنجاح!";
  } else {
    document.getElementById('paymentBox').style.display='none';
    document.getElementById('payStatus').innerText="رقم الطلب غير صحيح.";
  }
}
