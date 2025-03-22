window.months = {
    "1": "Январь",
    "2": "Февраль",
    "3": "Март",
    "4": "Апрель",
    "5": "Май",
    "6": "Июнь",
    "7": "Июль",
    "8": "Август",
    "9": "Сентябрь",
    "10": "Октябрь",
    "11": "Ноябрь",
    "12": "Декабрь"
};

const xhr = new XMLHttpRequest();
xhr.open('GET', './js/json/prayer-times.json', true);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const prayerTimes = JSON.parse(xhr.responseText);
        displayPrayerTimes(prayerTimes);
    }
};
xhr.send();

function displayPrayerTimes(prayerTimes) {
    for (const monthKey in prayerTimes) {
        const monthData = prayerTimes[monthKey];
        const table = document.getElementById('table' + monthKey);
        for (const dayKey in monthData) {
            const dayData = monthData[dayKey];
            const row = document.createElement('tr');
            const dayCell = document.createElement('td');
            dayCell.textContent = (dayKey < 10 ? '0' : '') + dayKey;
            row.appendChild(dayCell);
            Object.values(dayData).forEach(prayerTime => {
                const prayerTimeCell = document.createElement('td');
                prayerTimeCell.textContent = `${prayerTime[0] < 10 ? '0' : ''}${prayerTime[0]}:${prayerTime[1] < 10 ? '0' : ''}${prayerTime[1]}`;
                row.appendChild(prayerTimeCell);
            });
            table.querySelector('tbody').appendChild(row);
        }

        const monthHeader = document.getElementById(monthKey);
monthHeader.textContent = months[monthKey];

    }
}