var months = new Array(13);
months[1] = "Январь";
months[2] = "Февраль";
months[3] = "Март";
months[4] = "Апрель";
months[5] = "Май";
months[6] = "Июнь";
months[7] = "Июль";
months[8] = "Август";
months[9] = "Сентябрь";
months[10] = "Октябрь";
months[11] = "Ноябрь";
months[12] = "Декабрь";


var time = new Date();
var thismonth = months[time.getMonth() + 1];
document.getElementById("text-mount").innerHTML = (thismonth);


if (date < 10) date = '0' + date;