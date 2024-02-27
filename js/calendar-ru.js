var months = new Array(13);
months[1] = "Января";
months[2] = "Февраля";
months[3] = "Марта";
months[4] = "Апреля";
months[5] = "Мая";
months[6] = "Июня";
months[7] = "Июля";
months[8] = "Августа";
months[9] = "Сентября";
months[10] = "Октября";
months[11] = "Ноября";
months[12] = "Декабря";

var date = new Date();
var thisMonth = months[date.getMonth() + 1];
var thisYear = date.getFullYear();
var day = date.getDate(); // Use getDate() to get the day of the month
var dayOfWeek;

switch (date.getDay()) {
  case 0:
    dayOfWeek = "Воскресенье";
    break;
  case 1:
    dayOfWeek = "Понедельник";
    break;
  case 2:
    dayOfWeek = "Вторник";
    break;
  case 3:
    dayOfWeek = "Среда";
    break;
  case 4:
    dayOfWeek = "Четверг";
    break;
  case 5:
    dayOfWeek = "Пятница";
    break;
  case 6:
    dayOfWeek = "Суббота";
    break;
}

document.getElementById("ru-date").innerHTML = (day + " " + thisMonth + " " + thisYear + " г");