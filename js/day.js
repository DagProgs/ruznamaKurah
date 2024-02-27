fetch('js/json/prayer-times.json')
    .then(response => response.json())
    .then(data => {

        var prayerTimes = data;

        // Объявляем массив для порядка намазов
        var prayerOrder = [];

        // Заполняем массив порядком намазов
        prayerOrder.push("Фаджр");
        prayerOrder.push("Шурук");
        prayerOrder.push("Зухр");
        prayerOrder.push("Аср");
        prayerOrder.push("Магриб");
        prayerOrder.push("Иша");

        // Создаем объект отображения переименованных названий намазов
        var prayerNameMap = {
            "Фаджр": "Fajr",
            "Шурук": "Sunrise",
            "Зухр": "Dhuhr",
            "Аср": "Asr",
            "Магриб": "Maghrib",
            "Иша": "Isha"
        };

        var currentTime = new Date();
        var currentMonth = currentTime.getMonth() + 1; // Месяцы в JavaScript начинаются с 0
        var currentDate = currentTime.getDate();
        var currentTimeInMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
        var prayerTimesInMinutes = {};

        if (prayerTimes[currentMonth] && prayerTimes[currentMonth][currentDate]) {
            prayerOrder.forEach(function (prayer) {
                var originalName = prayerNameMap[prayer];
                if (originalName && prayerTimes[currentMonth][currentDate][originalName]) {
                    prayerTimesInMinutes[prayer] = prayerTimes[currentMonth][currentDate][originalName][0] * 60 + prayerTimes[currentMonth][currentDate][originalName][1];
                }
            });
        }

        // Добавляем логику для определения ближайшего намаза на следующий день
        var nextDay = new Date();
        nextDay.setDate(nextDay.getDate() + 1);
        nextDay.setHours(0, 0, 0, 0);
        var nextDayInMinutes = nextDay.getHours() * 60 + nextDay.getMinutes();

        if (currentTimeInMinutes > prayerTimesInMinutes["Магриб"]) {
            // Используем первый намаз следующего дня
            var nextDayPrayerTimes = prayerTimes[currentMonth][currentDate + 1];
            if (nextDayPrayerTimes) {
                prayerOrder.forEach(function (prayer) {
                    var originalName = prayerNameMap[prayer];
                    if (originalName && nextDayPrayerTimes[originalName]) {
                        prayerTimesInMinutes[prayer] = nextDayPrayerTimes[originalName][0] * 60 + nextDayPrayerTimes[originalName][1];
                    }
                });
            }
        }

        // Функция для обновления времени каждую секунду
// Функция для обновления времени каждую секунду
function updateRemainingTime() {
    var currentTime = new Date();
    var currentTimeInMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

    // Очищаем контейнер с временами намазов
    var prayerTimesContainer = document.getElementById('prayerTimesContainer');
    prayerTimesContainer.innerHTML = "";

    var nextPrayerFound = false; // Флаг для определения следующего намаза

    prayerOrder.forEach(function (prayer) {
        var timeInMinutes = prayerTimesInMinutes[prayer];
        if (timeInMinutes !== undefined) {
            var hours = Math.floor(timeInMinutes / 60);
            var minutes = timeInMinutes % 60;

            var prayerDiv = document.createElement('div');
            prayerDiv.classList.add('prayerTime');

            var prayerNameHeading = document.createElement('h2'); // Создаем элемент h2 для имени намаза
            prayerNameHeading.classList.add('prayerName');
            prayerNameHeading.textContent = prayer;

            var prayerTimeHeading = document.createElement('h3'); // Создаем элемент h3 для времени намаза
            prayerTimeHeading.classList.add('prayerTime');
            prayerTimeHeading.textContent = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');


            prayerDiv.appendChild(prayerNameHeading); // Добавляем h2 в блок намаза
            prayerDiv.appendChild(prayerTimeHeading); // Добавляем h3 в блок намаза

            // Проверяем, наступил ли намаз
            if (currentTimeInMinutes > timeInMinutes) {
                prayerDiv.classList.add('pastPrayer'); // Добавляем стиль для прошедшего намаза
            } else if (!nextPrayerFound) { // Если следующий намаз еще не найден
                prayerDiv.classList.add('nextPrayer'); // Добавляем стиль для следующего намаза
                nextPrayerFound = true; // Устанавливаем флаг следующего намаза

                // Рассчитываем оставшееся время до следующего намаза
                var remainingMinutes = timeInMinutes - currentTimeInMinutes;
                var remainingHours = Math.floor(remainingMinutes / 60);
                remainingMinutes = remainingMinutes % 60;

                var remainingTimeHeading = document.createElement('h4'); // Создаем элемент h4 для оставшегося времени
remainingTimeHeading.classList.add('remainingTime');
remainingTimeHeading.textContent = 'До ' + prayer + ': ' + remainingHours.toString().padStart(2, '0') + ':' + remainingMinutes.toString().padStart(2, '0');



                prayerDiv.appendChild(remainingTimeHeading); // Добавляем h4 с оставшимся временем и именем намаза в блок намаза
            }

            prayerTimesContainer.appendChild(prayerDiv); // Добавляем блок намаза в контейнер
        }
    });
}




        // Вызываем функцию обновления времени каждую секунду
        setInterval(updateRemainingTime, 1000); // Обновляем каждую секунду (1000 миллисекунд = 1 секунда)

        // Инициализируем контейнер при загрузке страницы
        updateRemainingTime();

    });
