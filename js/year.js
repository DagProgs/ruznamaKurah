// Получаем название города из параметров URL
const urlParams = new URLSearchParams(window.location.search);
const city = urlParams.get('city') || 'makhachkala';

// Массив месяцев на русском языке
const months = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

// Функция для форматирования времени
function formatTime(timeArray) {
  const hours = String(timeArray[0]).padStart(2, '0');
  const minutes = String(timeArray[1]).padStart(2, '0');
  return `${hours}:${minutes}`;
}

// Переменная для хранения ссылки на выбранный элемент
let selectedMonthElement = null;

// Загружаем данные для выбранного месяца
async function loadMonthData(monthIndex) {
  try {
    const response = await fetch(`js/json/${city}.min.json`);
    if (!response.ok) {
      throw new Error('Ошибка загрузки файла.');
    }
    const data = await response.json();

    // Очищаем таблицу
    const tableBody = document.getElementById('prayerTableBody');
    tableBody.innerHTML = '';

    // Заполняем таблицу данными для выбранного месяца
    const monthData = data[monthIndex + 1]; // Месяцы в JSON начинаются с 1
    for (const day in monthData) {
      const prayerTimes = monthData[day];
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${day}</td> <!-- Отображаем только день -->
        <td>${formatTime(prayerTimes.Fajr)}</td>
        <td>${formatTime(prayerTimes.Sunrise)}</td>
        <td>${formatTime(prayerTimes.Dhuhr)}</td>
        <td>${formatTime(prayerTimes.Asr)}</td>
        <td>${formatTime(prayerTimes.Maghrib)}</td>
        <td>${formatTime(prayerTimes.Isha)}</td>
      `;
      tableBody.appendChild(row);
    }

    // Показываем таблицу
    document.getElementById('prayerTable').style.display = 'table';
  } catch (error) {
    console.error('Ошибка:', error);
    alert('Не удалось загрузить данные.');
  }
}

// Создаем список месяцев
const monthsList = document.getElementById('monthsList');
const currentMonthIndex = new Date().getMonth(); // Текущий месяц (0-11)

months.forEach((month, index) => {
  const li = document.createElement('li');
  li.textContent = month;
  li.addEventListener('click', () => {
    // Удаляем класс 'selected' у предыдущего выбранного элемента
    if (selectedMonthElement) {
      selectedMonthElement.classList.remove('selected');
    }

    // Добавляем класс 'selected' к текущему элементу
    li.classList.add('selected');
    selectedMonthElement = li;

    // Загружаем данные для выбранного месяца
    loadMonthData(index);
  });

  // Если это текущий месяц, выделяем его и загружаем данные
  if (index === currentMonthIndex) {
    li.classList.add('selected');
    selectedMonthElement = li;
    loadMonthData(index); // Автоматически загружаем данные для текущего месяца
  }

  monthsList.appendChild(li);
});

// Отображаем название города
const cityNameElement = document.getElementById('cityName');
const cityNames = {
  makhachkala: 'Махачкала',
  kurah: 'Курахский район',
  sstalskiy: 'С.Стальский район'
  // Добавьте другие города по необходимости
};
const displayedCity = cityNames[city] || 'Неизвестный город';
cityNameElement.textContent = `${displayedCity}`;