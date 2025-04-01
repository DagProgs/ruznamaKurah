let timerInterval = null;
        const cityDataCache = {};
        let currentCity = 'kurah'; // Город по умолчанию
        let activeMonthButton = null; // Переменная для хранения активной кнопки месяца
        const today = new Date(); // Фиксируем сегодняшнюю дату

        async function loadPrayerTimes(city, month) {
            try {
                if (!cityDataCache[city]) {
                    console.log(`Загрузка данных для города: ${city}`);
                    const response = await fetch(`data/${city}.json`);
                    if (!response.ok) {
                        throw new Error(`Ошибка при загрузке файла: ${response.status}`);
                    }
                    cityDataCache[city] = await response.json();
                    console.log(`Данные для города ${city} успешно загружены.`);
                }
                updateUI(city, month);
            } catch (error) {
                console.error(`Ошибка при загрузке данных для города ${city}:`, error.message);
                alert(`Ошибка: ${error.message}`);
            }
        }

        function updateUI(city, month) {
            const data = cityDataCache[city];
            if (!data || !data[month]) {
                console.error(`Нет данных для месяца: ${month} в городе ${city}`);
                alert(`Нет данных для месяца: ${month} в городе ${city}`);
                return;
            }

            const monthData = data[month];
            const tableBody = document.getElementById('prayerTimesTableBody');
            tableBody.innerHTML = '';

            for (const day in monthData) {
                const prayerTimes = monthData[day];
                const row = document.createElement('tr');

                // Проверяем, является ли текущий день сегодняшним
                if (day === String(today.getDate()) && month == String(today.getMonth() + 1)) {
                    row.classList.add('current-day'); // Добавляем класс для выделения
                }

                row.innerHTML = `
                    <td>${day}</td>
                    <td>${formatTime(prayerTimes.Fajr)}</td>
                    <td>${formatTime(prayerTimes.Sunrise)}</td>
                    <td>${formatTime(prayerTimes.Dhuhr)}</td>
                    <td>${formatTime(prayerTimes.Asr)}</td>
                    <td>${formatTime(prayerTimes.Maghrib)}</td>
                    <td>${formatTime(prayerTimes.Isha)}</td>
                `;
                tableBody.appendChild(row);
            }

            // Устанавливаем заголовок с фиксированной сегодняшней датой и месяцем
            const monthName = getMonthName(today.getMonth()); // Месяцы начинаются с 0
            const formattedDate = `${today.getDate()} ${monthName}`;
            document.getElementById('tableHeader').textContent = formattedDate;

            // Обновляем название выбранного месяца снизу
            const selectedMonthName = getMonthName(month - 1); // Месяцы начинаются с 0
            document.getElementById('selectedMonthFooter').textContent = `Выбранный месяц: ${selectedMonthName}`;

            // Обновляем название выбранного города снизу
            const selectedCityName = getCityName(currentCity);
            document.getElementById('selectedCity').textContent = `${selectedCityName}`;
        }

        function formatTime(timeArray) {
            if (!Array.isArray(timeArray) || timeArray.length !== 2) {
                return 'Н/Д';
            }
            const hours = String(timeArray[0]).padStart(2, '0');
            const minutes = String(timeArray[1]).padStart(2, '0');
            return `${hours}:${minutes}`;
        }

        function getMonthName(monthIndex) {
            const months = [
                "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
                "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
            ];
            return months[monthIndex];
        }

        function getCityName(cityKey) {
            const cities = {
                "kurah": "Курахский район",
                "s.stalsk": "С.Стальский район",
                "derbent": "Дербент",
                "izberbash": "Избербаш",
                "makhachkala": "Махачкала",
                "kaspiysk": "Каспийск"
            };
            return cities[cityKey] || "Неизвестный город";
        }

        // Логика для показа/скрытия списка городов
        const toggleButton = document.getElementById('toggleButton');
        const cityList = document.getElementById('cityList');
        toggleButton.addEventListener('click', function () {
            if (cityList.parentElement.style.display === 'none' || cityList.parentElement.style.display === '') {
                cityList.parentElement.style.display = 'block';
            } else {
                cityList.parentElement.style.display = 'none';
            }
        });

        // Обработчик выбора города из списка
        cityList.addEventListener('click', function (event) {
            if (event.target.tagName === 'LI') {
                const selectedCity = event.target.getAttribute('data-city');
                currentCity = selectedCity; // Сохраняем выбранный город
                cityList.parentElement.style.display = 'none'; // Скрываем список после выбора
                

                // Показываем заголовок таблицы при выборе города
                document.getElementById('tableHeader').style.display = 'block';

                // Перезагружаем данные для нового города
                if (activeMonthButton) {
                    const selectedMonth = activeMonthButton.getAttribute('data-month');
                    loadPrayerTimes(currentCity, selectedMonth);
                }
            }
        });

        // Логика для показа/скрытия списка месяцев
        const toggleMonthsButton = document.getElementById('toggleMonthsButton');
        const monthList = document.getElementById('monthList');
        toggleMonthsButton.addEventListener('click', function () {
            if (monthList.style.display === 'none' || monthList.style.display === '') {
                monthList.style.display = 'block';
                toggleMonthsButton.textContent = 'Выбрать месяц -';
            } else {
                monthList.style.display = 'none';
                toggleMonthsButton.textContent = 'Выбрать месяц +';
            }
        });

        // Обработчик выбора месяца
        monthList.addEventListener('click', function (event) {
            if (event.target.tagName === 'LI') {
                const selectedMonth = event.target.getAttribute('data-month');

                // Удаляем класс 'active' у предыдущей активной кнопки
                if (activeMonthButton) {
                    activeMonthButton.classList.remove('active');
                }

                // Добавляем класс 'active' к новой кнопке
                event.target.classList.add('active');
                activeMonthButton = event.target;

                // Скрываем список месяцев
                monthList.style.display = 'none';
                toggleMonthsButton.textContent = 'Выбрать месяц +';

                // Скрываем заголовок таблицы при выборе месяца
                document.getElementById('tableHeader').style.display = 'none';

                // Загружаем данные для выбранного месяца
                loadPrayerTimes(currentCity, selectedMonth);
            }
        });

        // Загрузка данных для первого города и текущего месяца при загрузке страницы
        window.onload = function () {
            const currentMonth = today.getMonth() + 1; // Текущий месяц (1-12)
            loadPrayerTimes(currentCity, currentMonth);

            // Показываем заголовок таблицы при загрузке страницы
            document.getElementById('tableHeader').style.display = 'block';

            // Выделяем кнопку текущего месяца
            const currentMonthButton = Array.from(monthList.children).find(
                (li) => li.getAttribute('data-month') == currentMonth
            );
            if (currentMonthButton) {
                currentMonthButton.classList.add('active');
                activeMonthButton = currentMonthButton;
            }
        };