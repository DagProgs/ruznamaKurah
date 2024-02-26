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

document.getElementById("my-date-ru").innerHTML = (day + " " + thisMonth + " " + thisYear + " г");



//ar
$.fn.hijriDate = function (a = {}) {
    const r = {
        showWeekDay: void 0 === a.showWeekDay || a.showWeekDay,
        showGregDate: void 0 !== a.showGregDate && a.showGregDate,
        separator: a.separator && "string" == typeof a.separator ? a.separator : "-",
        weekDayLang: a.weekDayLang && "string" == typeof a.weekDayLang ? a.weekDayLang : "ar",
        hijriLang: a.hijriLang && "string" == typeof a.hijriLang ? a.hijriLang : "ar",
        gregLang: a.gregLang && "string" == typeof a.gregLang ? a.gregLang : "ar",
        correction: a.correction && "number" == typeof a.correction ? a.correction : 0,
    };
    const t = new Date();
    const n = {
        ar: ["المحرم", "صفر", "ربيع الأول", "ربيع الآخر", "جمادى الأولى", "جمادى الآخرة", "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"],
        ru: ["Мухаррам", "Сафар", "Раби-уль-авваль", "Раби-уль-ахир", "Джумад-уль-ула", "Джумад-уль-ахир", "Раджаб", "Шаъбан", "Рамадан", "Шавваль", "Зуль-каъда", "Зуль-хиджа"],
    };
    const o = "ru" === r.hijriLang ? "г" : "";
    const i = "ru" === r.gregLang ? "г" : "";
    let h;
    function s(a, e, r) {
        this.year = a;
        this.month = e;
        this.day = r;
        this.toFixed = g;
        this.toString = y;
    }
    function g() {
        return this.day + Math.ceil(29.5 * (this.month - 1)) + 354 * (this.year - 1) + Math.floor((3 + 11 * this.year) / 30) + 227015 - 1;
    }
    function y() {
        return `${this.day} ${n[r.hijriLang][this.month - 1]} ${this.year}`;
    }
    const c = t.getFullYear();
    let l = t.getMonth();
    const u = t.getDate();
    const d = t.getDay();
    const w = r.showGregDate ? `${r.separator} <span class="greg-date">${u} ${n[r.gregLang][l]} ${c} ${i}</span>` : "";
    h = function (a, t, n) {
        const o = Math.floor((a - 1) / 4);
        const i = Math.floor((a - 1) / 100);
        const h = Math.floor((a - 1) / 400);
        const s = Math.floor((367 * t - 362) / 12);
        return t <= 2 ? (e = 0) : t > 2 && function (a) {
            return a % 4 == 0 && a % 100 != 0 || a % 400 == 0;
        }(a) ? (e = -1) : (e = -2), 0 + 365 * (a - 1) + o - i + h + s + e + (n + r.correction);
    }(c, ++l, u);
    let f = new s(1421, 11, 28);
    f = function (a) {
        const e = new s(1100, 1, 1);
        e.year = Math.floor((30 * (a - 227015) + 10646) / 10631);
        const r = new s(e.year, 1, 1);
        const t = Math.ceil((a - 29 - r.toFixed()) / 29.5) + 1;
        e.month = Math.min(t, 12);
        r.year = e.year;
        r.month = e.month;
        r.day = 1;
        e.day = a - r.toFixed() + 1;
        return e;
    }(h);
    const D = `<span class="week-day">${r.showWeekDay ? { ar: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"], ru: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"] }[r.weekDayLang][d] : ""}</span> 
  
  <span class="hijri-date">${`${f.toString()} ${o}`}</span> ${w}`;
    this.html(D);
};


$('.hijri-date').hijriDate({
    showGregDate: false,
    showWeekDay: false,
    separator: '&nbsp&nbsp|&nbsp&nbsp',
    weekDayLang: 'ru',
    gregLang: 'ru',
    hijriLang: 'ru',
    correction: +0
});

//day
if (thisyear < 2000)
    thisyear = thisyear + 1900;
if (day == 1) DayofWeek = "Воскресенье";
if (day == 2) DayofWeek = "Понедельник";
if (day == 3) DayofWeek = "Вторник";
if (day == 4) DayofWeek = "Среда";
if (day == 5) DayofWeek = "Четверг";
if (day == 6) DayofWeek = "Пятница";
if (day == 7) DayofWeek = "Суббота";

document.getElementById("days").innerHTML = (DayofWeek + " ");