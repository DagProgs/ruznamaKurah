// Функция для получения текущего месяца
function getCurrentMonth() {
    const date = new Date();
    const options = { month: 'long', year: 'numeric' };
    return date.toLocaleDateString('ru-RU', options);
}

// Получаем текущую дату
const today = new Date();

// Отображение текущего месяца и сегодняшнего числа
document.getElementById('current-month').textContent = `Сегодня: ${today.getDate()} ${getCurrentMonth()}`;

// Функция для получения параметров URL
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const area = getUrlParameter('area');
const areaId = getUrlParameter('id');

if (area && areaId) {
    document.getElementById('selected-area').textContent = `Выбрано: ${area}`;

    // Проверяем наличие интернет-соединения
    if (navigator.onLine) {
        // Получаем текущую дату
        const today = new Date();
        const currentDay = today.getDate(); // Получаем текущий день месяца
        const currentMonth = today.getMonth() + 1; // +1 для соответствия вашим JSON-файлам

        // Загрузка данных о времени молитв для выбранной территории
        fetch(`timesprayer/${areaId}/${currentMonth}.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Сеть ответила с ошибкой: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                const timesList = document.getElementById('times-list');
                // Очищаем таблицу перед добавлением новых данных
                timesList.innerHTML = '';
                data.array.forEach(item => {
                    const dateParts = item.date.split('-'); // Предполагаем, что дата в формате 'YYYY-MM-DD'
                    const day = parseInt(dateParts[2]); // Получаем день и преобразуем в число
                    const row = document.createElement('tr');
                    if (day === currentDay) {
                        row.classList.add('today'); // Добавляем класс для выделения
                    }
                    row.innerHTML = `
                        <td>${day}</td>
                        <td>${item.times.fajr}</td>
                        <td>${item.times.sunrise}</td>
                        <td>${item.times.dhuhr}</td>
                        <td>${item.times.asr}</td>
                        <td>${item.times.maghrib}</td>
                        <td>${item.times.night}</td>
                    `;
                    timesList.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных времени:', error);
                document.getElementById('times-list').innerHTML = '<tr><td colspan="7">Не удалось загрузить данные.</td></tr>';
            });
    } else {
        document.getElementById('times-list').innerHTML = '<tr><td colspan="7">Нет интернет-соединения. Пожалуйста, проверьте ваше подключение.</td></tr>';
    }
} else {
    document.getElementById('selected-area').textContent = 'Выбор области не был сделан.';
}
