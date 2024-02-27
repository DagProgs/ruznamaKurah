fetch('js/json/prayer-times.json')
    .then(response => response.json())
    .then(data => {

        var prayerTimes = data;

        // Объявляем массив для порядка намазов
        var prayerOrder = [];

        // Заполняем массив порядком намазов
        prayerOrder.push("Фаджр");
        prayerOrder.push("Восх");
        prayerOrder.push("Зухр");
        prayerOrder.push("Аср");
        prayerOrder.push("Магриб");
        prayerOrder.push("Иша");

        // Создаем объект отображения переименованных названий намазов
        var prayerNameMap = {
            "Фаджр": "Fajr",
            "Восх": "Sunrise",
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

        console.log("Prayer Times in Minutes:", prayerTimesInMinutes);

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

        console.log("Updated Prayer Times in Minutes:", prayerTimesInMinutes);

        // Функция для обновления времени каждую секунду
        function updateRemainingTime() {
            var currentTime = new Date();
            var currentTimeInMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

            // Заполняем таблицу с временами намазов
            var tableBody = document.getElementById('prayerTimesTableBodyMain');
            tableBody.innerHTML = "";

            var nextPrayerFound = false; // Флаг для определения следующего намаза

            prayerOrder.forEach(function (prayer) {
                var timeInMinutes = prayerTimesInMinutes[prayer];
                if (timeInMinutes !== undefined) {
                    var hours = Math.floor(timeInMinutes / 60);
                    var minutes = timeInMinutes % 60;

                    var row = tableBody.insertRow();
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);

                    cell1.innerHTML = prayer;
                    cell2.innerHTML = hours + ':' + (minutes < 10 ? '0' : '') + minutes;

                    // Проверяем, наступил ли намаз
                    if (currentTimeInMinutes > timeInMinutes) {
                        cell2.classList.add('pastPrayer'); // Добавляем стиль для прошедшего намаза
                        cell2.classList.add('pastPrayerText'); // Добавляем стиль для текста прошедшего намаза
                    } else if (!nextPrayerFound) { // Если следующий намаз еще не найден
                        cell2.classList.add('nextPrayer'); // Добавляем стиль для следующего намаза
                        nextPrayerFound = true; // Устанавливаем флаг следующего намаза

                        // Рассчитываем оставшееся время до следующего намаза
                        var remainingMinutes = timeInMinutes - currentTimeInMinutes;
                        var hours = Math.floor(remainingMinutes / 60);
                        var minutes = remainingMinutes % 60;

                        cell3.innerHTML = '<span class="remainingTime">' + hours + ':' + (minutes < 10 ? '0' : '') + minutes + '</span>';
                    }
                }
            });
        }

        // Вызываем функцию обновления времени каждую секунду
        setInterval(updateRemainingTime, 1000); // Обновляем каждую секунду (1000 миллисекунд = 1 секунда)

        // Инициализируем таблицу при загрузке страницы
        updateRemainingTime();
    });
