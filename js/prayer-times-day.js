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

        // Функция для вычисления времени между текущим временем и временем намаза
        function getTimeDifference(currentTime, prayerTime) {
            var difference = prayerTime - currentTime;
            if (difference <= 0) {
                return '00:00';
            } else {
                var hours = Math.floor(difference / 60);
                var minutes = difference % 60;
                return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
            }
        }

        // Вывод времени каждого намаза
        prayerOrder.forEach(function (prayer) {
            var timeInMinutes = prayerTimesInMinutes[prayer];
            if (timeInMinutes !== undefined) {
                var hours = Math.floor(timeInMinutes / 60);
                var minutes = timeInMinutes % 60;

                var prayerTimeFormatted = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');

                // Вставляем время намаза в соответствующий элемент HTML
                var prayerElementId;
                switch (prayer) {
                    case "Фаджр":
                        prayerElementId = "fajrprayerTimes";
                        break;
                    case "Шурук":
                        prayerElementId = "sunriseprayerTimes";
                        break;
                    case "Зухр":
                        prayerElementId = "dhuhrprayerTimes";
                        break;
                    case "Аср":
                        prayerElementId = "asrprayerTimes";
                        break;
                    case "Магриб":
                        prayerElementId = "maghribprayerTimes";
                        break;
                    case "Иша":
                        prayerElementId = "ishaprayerTimes";
                        break;
                    default:
                        break;
                }

                var prayerElement = document.getElementById(prayerElementId);
                if (prayerElement) {
                    prayerElement.innerHTML = prayerTimeFormatted;

                    if (currentTimeInMinutes >= timeInMinutes) {
                        prayerElement.classList.add("past-prayer"); // Добавляем класс, указывающий на прошедший намаз
                    } else {
                        prayerElement.classList.add("next-prayer");
                    }
                }
            }
        });


        function updateRemainingTime() {
            var currentTime = new Date();
            var currentTimeInMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
            var timeToNextPrayerElement = document.getElementById('timeToNextPrayer');
            var redLine = document.getElementById('redLine');
            var nextPrayerFound = false;
            var nextPrayer;
            var minTimeDifference = Infinity;
        
            // Проходим по временам намазов и находим ближайший намаз
            for (var i = 0; i < prayerOrder.length; i++) {
                var prayer = prayerOrder[i];
                var timeInMinutes = prayerTimesInMinutes[prayer];
                if (timeInMinutes !== undefined && timeInMinutes > currentTimeInMinutes) {
                    var timeDifference = timeInMinutes - currentTimeInMinutes;
                    if (timeDifference < minTimeDifference) {
                        minTimeDifference = timeDifference;
                        nextPrayer = prayer;
                        nextPrayerFound = true;
                    }
                }
            }
        
            // Если следующий намаз найден, обновляем информацию о времени до него и длине линии
            if (nextPrayerFound) {
                var remainingTime;
                var totalPrayerTimeInMinutes;
        
                // Если следующий намаз - Фаджр, а текущее время уже после намаза Иша, то считаем оставшееся время до Фаджра следующего дня
                if (nextPrayer === "Фаджр" && currentTimeInMinutes > prayerTimesInMinutes["Иша"]) {
                    remainingTime = getTimeDifference(currentTimeInMinutes, prayerTimesInMinutes["Фаджр"] + (
                    24 * 60)); // Добавляем 24 часа, чтобы перейти на следующий день
                    totalPrayerTimeInMinutes = prayerTimesInMinutes["Фаджр"] - prayerTimesInMinutes["Иша"] + (24 * 60);
                } else {
                    remainingTime = getTimeDifference(currentTimeInMinutes, prayerTimesInMinutes[nextPrayer]);
                    totalPrayerTimeInMinutes = prayerTimesInMinutes[nextPrayer] - prayerTimesInMinutes[prayerOrder[prayerOrder.indexOf(nextPrayer) - 1]];
                }
        
                timeToNextPrayerElement.textContent = 'До ' + nextPrayer + 'а ' + remainingTime;
                var remainingPercentage = (minTimeDifference / totalPrayerTimeInMinutes) * 100;
                redLine.style.width = (100 - remainingPercentage) + '%';
        
                // Добавляем класс для текущего намаза
                var currentPrayerElement = document.getElementById(prayerNameMap[nextPrayer].toLowerCase() + 'prayerTimes');
                if (currentPrayerElement) {
                    currentPrayerElement.classList.add("current-prayer");
                }
            } else {
                // Если нет намазов, то показываем время от Иши до Фаджра следующего дня
                var remainingTimeToNextDayFajr = getTimeDifference(currentTimeInMinutes, prayerTimesInMinutes["Фаджр"] + (24 * 60)); // Добавляем 24 часа, чтобы перейти на следующий день
                timeToNextPrayerElement.textContent = 'До Фаджра ' + remainingTimeToNextDayFajr;
                redLine.style.width = '0'; // Если нет намазов, линия не должна быть видимой
            }
        }
        
        
        // Вызываем функцию обновления времени каждую секунду
        setInterval(updateRemainingTime, 1000); // Обновляем каждую секунду (1000 миллисекунд = 1 секунда)
        
        // Инициализируем контейнер при загрузке страницы
        updateRemainingTime();
    });
