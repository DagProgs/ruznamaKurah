// Глобальная переменная для хранения интервала таймера
let timerInterval = null;

// Объект для хранения данных всех городов
const cityDataCache = {};

// Функция для загрузки данных JSON
async function loadPrayerTimes(city) {
  try {
    // Если данные для города уже загружены, используем их
    if (cityDataCache[city]) {
      console.log(`Данные для города ${city} уже загружены. Используем кэш.`);
      updateUI(city);
      return;
    }

    console.log(`Загрузка данных для города: ${city}`);
    const response = await fetch(`data/${city}.json`);
    if (!response.ok) {
      throw new Error(`Ошибка при загрузке файла: ${response.status}`);
    }
    const data = await response.json();

    // Сохраняем данные в кэш
    cityDataCache[city] = data;
    console.log(`Данные для города ${city} успешно загружены и сохранены в кэше.`);

    // Обновляем интерфейс
    updateUI(city);
  } catch (error) {
    console.error(`Ошибка при загрузке данных для города ${city}:`, error.message);
    alert(`Ошибка: ${error.message}`);
  }
}

// Функция для обновления интерфейса при выборе города
function updateUI(city) {
  const now = new Date();
  const month = String(now.getMonth() + 1); // Месяцы начинаются с 0
  const monthName = getMonthName(now.getMonth()); // Получаем название месяца
  const currentDay = String(now.getDate()); // Текущий день месяца
  const data = cityDataCache[city];

  if (!data || !data[month]) {
    console.error(`Нет данных для месяца: ${month} в городе ${city}`);
    alert(`Нет данных для месяца: ${month} в городе ${city}`);
    return;
  }

  // Обновляем название города
  document.getElementById('cityTitle').textContent = `${getCityDisplayName(city)}`;

  // Обновляем название месяца
  document.getElementById('monthTitle').textContent = `Месяц: ${monthName}`;

  const monthData = data[month];
  const tableBody = document.getElementById('prayerTimesTableBody');
  tableBody.innerHTML = ''; // Очищаем таблицу

  for (const day in monthData) {
    const prayerTimes = monthData[day];
    const row = document.createElement('tr');

    // Проверяем, является ли текущий день сегодняшним
    if (day === currentDay) {
      row.classList.add('current-day'); // Добавляем класс для выделения
    }

    // Добавляем день
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
}

// Функция для получения названия месяца
function getMonthName(monthIndex) {
  const months = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
  ];
  return months[monthIndex];
}

// Функция форматирования времени
function formatTime(timeArray) {
  if (!Array.isArray(timeArray) || timeArray.length !== 2) {
    return 'Н/Д';
  }
  const hours = String(timeArray[0]).padStart(2, '0');
  const minutes = String(timeArray[1]).padStart(2, '0');
  return `${hours}:${minutes}`;
}

// Функция для получения русского названия города
function getCityDisplayName(cityKey) {
  const cities = {
    kurah: 'Курахский район',
    's.stalsk': 'С.Стальский район',
    derbent: 'Дербент',
    izberbash: 'Избербаш',
    makhachkala: 'Махачкала',
    kaspiysk: 'Каспийск'
  };
  return cities[cityKey] || cityKey; // Если название не найдено, возвращаем ключ
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
    loadPrayerTimes(selectedCity);
    cityList.parentElement.style.display = 'none'; // Скрываем список после выбора
  }
});

// Загрузка данных для первого города при загрузке страницы
window.onload = function () {
  const defaultCity = 'kurah'; // Первый город по умолчанию
  loadPrayerTimes(defaultCity);
};