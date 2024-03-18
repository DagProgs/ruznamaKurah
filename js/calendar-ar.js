function hijriDate(a = {}) {
    const r = {
        showWeekDay: a.showWeekDay === undefined ? true : a.showWeekDay,
        showGregDate: a.showGregDate !== undefined && a.showGregDate,
        separator: a.separator && typeof a.separator === 'string' ? a.separator : '-',
        weekDayLang: a.weekDayLang && typeof a.weekDayLang === 'string' ? a.weekDayLang : 'ar',
        hijriLang: a.hijriLang && typeof a.hijriLang === 'string' ? a.hijriLang : 'ar',
        gregLang: a.gregLang && typeof a.gregLang === 'string' ? a.gregLang : 'ar',
        correction: a.correction && typeof a.correction === 'number' ? a.correction : 0,
    };

    const t = new Date();
    let h;

    function HijriDate(year, month, day) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.toFixed = function() {
            return this.day + Math.ceil(29.5 * (this.month - 1)) + 354 * (this.year - 1) + Math.floor((3 + 11 * this.year) / 30) + 227015 - 1;
        };
        this.toString = function() {
            const hijriMonths = {
                ar: ["المحرم", "صفر", "ربيع الأول", "ربيع الآخر", "جمادى الأولى", "جمادى الآخرة", "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"],
                ru: ["Мухаррам", "Сафар", "Раби-уль-авваль", "Раби-уль-ахир", "Джумад-уль-ула", "Джумад-уль-ахир", "Раджаб", "Шаъбан", "Рамадан", "Шавваль", "Зуль-каъда", "Зуль-хиджа"]
            };
            return `${this.day} ${hijriMonths[r.hijriLang][this.month - 1]} ${this.year}`;
        };
    }

    const c = t.getFullYear();
    let l = t.getMonth() + 1;
    const u = t.getDate();
    const d = t.getDay();

    h = (function (a, t, n) {
        const o = Math.floor((a - 1) / 4);
        const i = Math.floor((a - 1) / 100);
        const h = Math.floor((a - 1) / 400);
        const s = Math.floor((367 * t - 362) / 12);
        let e;
        if (t <= 2) {
            e = 0;
        } else if (t > 2 && (a % 4 === 0 && a % 100 !== 0 || a % 400 === 0)) {
            e = -1;
        } else {
            e = -2;
        }
        return 0 + 365 * (a - 1) + o - i + h + s + e + (n + r.correction);
    })(c, l, u);

    let f = new HijriDate(1421, 11, 28);
    f = (function (a) {
        const e = new HijriDate(1100, 1, 1);
        e.year = Math.floor((30 * (a - 227015) + 10646) / 10631);
        const r = new HijriDate(e.year, 1, 1);
        const t = Math.ceil((a - 29 - r.toFixed()) / 29.5) + 1;
        e.month = Math.min(t, 12);
        r.year = e.year;
        r.month = e.month;
        r.day = 1;
        e.day = a - r.toFixed() + 1;
        return e;
    })(h);

    const day = f.day;
    const thisMonth = f.month;
    const monthNames = {
        ar: ["المحرم", "صفر", "ربيع الأول", "ربيع الآخر", "جمادى الأولى", "جمادى الآخرة", "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"],
        ru: ["Мухаррам", "Сафар", "Раби-уль-авваль", "Раби-уль-ахир", "Джумад-уль-ула", "Джумад-уль-ахир", "Раджаб", "Шаъбан", "Рамадан", "Шавваль", "Зуль-каъда", "Зуль-хиджа"]
    };
    const monthText = monthNames[r.hijriLang][thisMonth - 1];
    const thisYear = f.year;
    const dayOfWeek = t.toLocaleDateString(r.weekDayLang, { weekday: 'long' });

    document.getElementById("ar-day").innerHTML = day;
    document.getElementById("ar-mounth").innerHTML = monthText;
    document.getElementById("ar-year").innerHTML = thisYear + " г";
}

hijriDate({
    showGregDate: false,
    showWeekDay: false,
    separator: '&nbsp&nbsp|&nbsp&nbsp',
    weekDayLang: 'ru',
    gregLang: 'ru',
    hijriLang: 'ru',
    correction: -1
});
