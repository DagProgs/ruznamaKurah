var now = new Date(), date = now.getDate(), hours = now.getHours();
var tr = document.querySelectorAll('tr');
tr[(date || 31) - 0].classList.add('closed');