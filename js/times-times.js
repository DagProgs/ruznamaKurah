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
  document.getElementById('selected-area').textContent = `${area}`;

  // Получаем текущую дату
  const currentDay = today.getDate(); // Получаем текущий день месяца
  const currentMonth = today.getMonth() + 1; // +1 для соответствия вашим JSON-файлам

  // Загрузка данных о времени молитв для выбранной территории
  fetch(`./timesprayer/${areaId}/${currentMonth}.json`) // Замените на нужный файл (например, 1.json для января)
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
      // Сохраняем данные в localStorage для кэширования
      localStorage.setItem(`times_${areaId}_${currentMonth}`, JSON.stringify(data));
    })
    .catch(error => {
      console.error('Ошибка при загрузке данных времени:', error);
      // Если не удалось загрузить данные, попробуем использовать кэшированные
      const cachedData = localStorage.getItem(`times_${areaId}_${currentMonth}`);
      if (cachedData) {
        const data = JSON.parse(cachedData);
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
        alert('Данные загружены из кэша.'); // Сообщаем пользователю
      } else {
        document.getElementById('selected-area').textContent = 'Не удалось загрузить данные, и нет кэшированных данных.';
      }
    });
} else {
  document.getElementById('selected-area').textContent
