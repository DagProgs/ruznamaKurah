// Загрузка данных из файла prayer-times.json
fetch('js/json/prayer-times.json')
.then(response => response.json())
.then(data => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    const todayPrayerTimes = data[currentMonth][currentDay];

    const prayerNames = {
        "Fajr": "Фаджр",
        "Sunrise": "Шурук",
        "Dhuhr": "Зухр",
        "Asr": "Аср",
        "Maghrib": "Магриб",
        "Isha": "Иша"
    };

    for (const time in todayPrayerTimes) {
        const hour = todayPrayerTimes[time][0];
        const minute = todayPrayerTimes[time][1];

        const formattedTime = `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}`;
        document.getElementById(time.toLowerCase() + "-time").innerText = formattedTime;
        document.getElementById(time.toLowerCase() + "-name").innerText = prayerNames[time];

    }

    // Функция для обновления цвета времени намаза
    function updatePrayerTimeColor() {
    const currentTime = new Date();
    const currentTotalMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
 
    for (const time in todayPrayerTimes) {
        const hour = todayPrayerTimes[time][0];
        const minute = todayPrayerTimes[time][1];
        const prayerTotalMinutes = hour * 60 + minute;
 
        const timeElement = document.getElementById(time.toLowerCase() + "-time");
        const next = nextTime(time);
 
        if (!todayPrayerTimes ||
            (time === "Isha" && 
            (
                currentTotalMinutes >= prayerTotalMinutes || // До конца текущего дня
                currentTotalMinutes < (todayPrayerTimes["Fajr"][0] * 60 + todayPrayerTimes["Fajr"][1]) // До начала намаза Fajr
            ))
        ) {
            timeElement.classList.add("highlighted");
        } else if (currentTotalMinutes >= prayerTotalMinutes && currentTotalMinutes < (todayPrayerTimes[next][0] * 60 + todayPrayerTimes[next][1])) {
            timeElement.classList.add("highlighted");
            timeElement.classList.remove("not-passed");
        } else {
            timeElement.classList.add("not-passed");
            timeElement.classList.remove("highlighted");
        }
    }
}


    // Функция для получения следующего времени
    function nextTime(currentTime) {
        const times = Object.keys(todayPrayerTimes);
        const currentIndex = times.indexOf(currentTime);
        return currentIndex !== -1 && times[currentIndex + 1];
    }

    // Вызов функции для обновления цвета каждые 10 секунд
    updatePrayerTimeColor(); // Сначала выполнить функцию один раз при загрузке страницы
    setInterval(updatePrayerTimeColor, 10000); // каждые 10 секунд (10000 миллисекунд)


})
.catch(error => console.error('Ошибка загрузки данных:', error));