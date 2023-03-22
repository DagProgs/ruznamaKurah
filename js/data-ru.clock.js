//ru
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

var time = new Date();
var thismonth = months[time.getMonth() + 1];
var date = time.getDate();
var thisyear = time.getFullYear();
var day = time.getDay() + 1;

if (date < 10) date = '0' + date;

if (thisyear < 2000)
    thisyear = thisyear + 1900;
if (day == 1) DayofWeek = "Воскресенье";
if (day == 2) DayofWeek = "Понедельник";
if (day == 3) DayofWeek = "Вторник";
if (day == 4) DayofWeek = "Среда";
if (day == 5) DayofWeek = "Четверг";
if (day == 6) DayofWeek = "Пятница";
if (day == 7) DayofWeek = "Суббота";

document.getElementById("my-date-ru").innerHTML = (DayofWeek + " " + " | " + date + " " + thismonth + " " + thisyear + " " + "г");


// clock
function currentTime() {
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();

    hour = updateTime(hour);
    min = updateTime(min);
    sec = updateTime(sec);
    document.getElementById("clock").innerText = hour + " : " + min + " : " + sec + " "
    var t = setTimeout(currentTime, 1000);
}

function updateTime(k) {
    if (k < 10) {
        return "0" + k;
    }
    else {
        return k;
    }
}

currentTime();


//ru mount
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


document.getElementById("mount-ru").innerHTML = (thismonth);