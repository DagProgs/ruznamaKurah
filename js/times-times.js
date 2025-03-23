// Получаем текущую дату
const today = new Date();
const currentDay = today.getDate(); // Получаем текущий день месяца
const currentMonth = today.getMonth() + 1; // +1 для соответствия вашим JSON-файлам

// Загрузка данных о времени молитв для выбранной территории
fetch(`/timesprayer/${areaId}/${currentMonth}.json`) // Замените на нужный файл (например, 1.json для января)
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
    
    // Фильтруем данные по текущему месяцу и дню
    data.array.forEach(item => {
      const dateParts = item.date.split('-'); // Предполагаем, что дата в формате 'YYYY-MM-DD'
      const day = parseInt(dateParts[2]); // Получаем день и преобразуем в число

      // Проверяем, если текущий месяц и день совпадают
      if (day === currentDay) {
        const row = document.createElement('tr');
        row.classList.add('today'); // Добавляем класс для выделения
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
      }
    });

    // Если данных не найдено, можно вывести сообщение
    if (timesList.innerHTML === '') {
      const noDataRow = document.createElement('tr');
      noDataRow.innerHTML = `<td colspan="7">Нет данных для сегодняшнего дня.</td>`;
      timesList.appendChild(noDataRow);
    }

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
        const dateParts = item.date.split('-');
        const day = parseInt(dateParts[2]);
        const row = document.createElement('tr');
        if (day === currentDay) {
          row.classList.add('today');
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
      alert('Данные загружены из кэша.');
    } else {
      document.getElementById('selected-area').
