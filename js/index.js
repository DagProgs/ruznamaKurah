let currentIntervalId = null; // Для хранения текущего интервала
// Функция для форматирования времени (например, [5, 39] -> "05:39")
function formatTime(timeArray) {
  const hours = String(timeArray[0]).padStart(2, '0');
  const minutes = String(timeArray[1]).padStart(2, '0');
  return `${hours}:${minutes}`;
}
// Функция для преобразования времени в минуты с начала дня
function timeToMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}
// Функция для обновления обратного отсчета
function updateCountdown(endTime, nextPrayerName, city) {
  const countdownElement = document.getElementById('countdown');
  // Очищаем предыдущий интервал
  if (currentIntervalId) {
    clearInterval(currentIntervalId);
  }
  currentIntervalId = setInterval(() => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    // Проверяем, не изменился ли город во время работы таймера
    const currentCity = localStorage.getItem('selectedCity');
    if (currentCity !== city) {
      clearInterval(currentIntervalId);
      return;
    }
    // Если время переходит через полночь
    let remainingMinutes = endTime - currentMinutes;
    if (remainingMinutes < 0) {
      remainingMinutes += 24 * 60; // Добавляем 24 часа в минутах
    }
    if (remainingMinutes <= 0) {
      // Очищаем интервал
      clearInterval(currentIntervalId);
      // Показываем сообщение о завершении намаза
      countdownElement.textContent = 'Намаз завершен!';
      // Через 1 секунду обновляем данные
      setTimeout(() => {
        loadTodayPrayerTimes(currentCity, localStorage.getItem('selectedCityName'));
      }, 1000);
    } else {
      const hours = Math.floor(remainingMinutes / 60);
      const minutes = remainingMinutes % 60;
      countdownElement.textContent = `До ${nextPrayerName}а: ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }
  }, 1000); // Обновляем каждую секунду
}
// Функция для загрузки времени намаза
async function loadTodayPrayerTimes(city = 'kurah', cityName = 'Курахский район') {
  try {
    // Очищаем предыдущий интервал
    if (currentIntervalId) {
      clearInterval(currentIntervalId);
    }
    // Загружаем JSON-файл для выбранного города
    const response = await fetch(`js/json/${city}.min.json`);
    if (!response.ok) {
      throw new Error('Ошибка загрузки файла.');
    }
    const data = await response.json();
    // Определяем текущую дату
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Месяц (1-12)
    const currentDay = currentDate.getDate(); // День месяца
    // Получаем время намаза на сегодня
    const todayData = data[currentMonth][currentDay];
    // Отображаем время намаза в соответствующих элементах
    document.getElementById('fajrTime').textContent = formatTime(todayData.Fajr);
    document.getElementById('sunriseTime').textContent = formatTime(todayData.Sunrise);
    document.getElementById('dhuhrTime').textContent = formatTime(todayData.Dhuhr);
    document.getElementById('asrTime').textContent = formatTime(todayData.Asr);
    document.getElementById('maghribTime').textContent = formatTime(todayData.Maghrib);
    document.getElementById('ishaTime').textContent = formatTime(todayData.Isha);
    // Обновляем название города
    document.getElementById('cityName').innerHTML = `${cityName}`;
    // Обновляем выбранный город в блоке "Посмотреть время намаза на год"
    document.getElementById('selectedCityForYear').textContent = cityName;
    // Обновляем выбранный город в header
    document.getElementById('selectedCityHeader').textContent = cityName;
    // Определяем текущее время в минутах
    const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();
    // Массив времен намаза
    const prayerTimes = [
      { id: 'fajrTime', label: 'Фаджр', time: todayData.Fajr },
      { id: 'sunriseTime', label: 'Восход', time: todayData.Sunrise },
      { id: 'dhuhrTime', label: 'Зухр', time: todayData.Dhuhr },
      { id: 'asrTime', label: 'Аср', time: todayData.Asr },
      { id: 'maghribTime', label: 'Магриб', time: todayData.Maghrib },
      { id: 'ishaTime', label: 'Иша', time: todayData.Isha },
    ];
    // Очищаем все стили перед применением новых
    prayerTimes.forEach(prayer => {
      const element = document.getElementById(prayer.id);
      element.classList.remove('current-prayer', 'past-prayer', 'next-prayer');
    });
    // Определяем текущий и следующий намаз
    let currentPrayer = null;
    let nextPrayer = null;
    for (let i = 0; i < prayerTimes.length; i++) {
      const prayerTimeInMinutes = timeToMinutes(formatTime(prayerTimes[i].time));
      if (currentTime < prayerTimeInMinutes) {
        currentPrayer = i === 0 ? prayerTimes[prayerTimes.length - 1] : prayerTimes[i - 1];
        nextPrayer = prayerTimes[i];
        break;
      }
    }
    // Если текущее время после Иши, то текущий намаз — Иша, а следующий — Фаджр следующего дня
    if (!currentPrayer) {
      currentPrayer = prayerTimes[prayerTimes.length - 1];
      nextPrayer = prayerTimes[0];
    }
    // Применяем стили к каждому времени намаза
    prayerTimes.forEach(prayer => {
      const element = document.getElementById(prayer.id);
      const prayerTimeInMinutes = timeToMinutes(formatTime(prayer.time));
      if (prayerTimeInMinutes < currentTime && prayer.id !== currentPrayer.id) {
        // Прошедшие намазы
        element.classList.add('past-prayer');
      } else if (prayer.id === currentPrayer.id) {
        // Текущий намаз
        element.classList.add('current-prayer');
      } else if (prayer.id === nextPrayer.id) {
        // Следующий намаз
        element.classList.add('next-prayer');
      }
    });
    // Обновляем текст текущего намаза и его времени сверху
    const currentPrayerFormattedTime = formatTime(currentPrayer.time);
    document.getElementById('currentPrayerInfo').textContent =
      `${currentPrayer.label} - ${currentPrayerFormattedTime}`;
    // Выводим время окончания текущего намаза
    /* document.getElementById('currentPrayerEndTime').textContent = formatTime(nextPrayer.time); */
    // Запускаем обратный отсчет до следующего намаза
    const endTimeInMinutes = timeToMinutes(formatTime(nextPrayer.time));
    updateCountdown(endTimeInMinutes, nextPrayer.label, city);
  } catch (error) {
    console.error('Ошибка:', error);
    document.getElementById('fajrTime').textContent = 'Ошибка';
    document.getElementById('sunriseTime').textContent = 'Ошибка';
    document.getElementById('dhuhrTime').textContent = 'Ошибка';
    document.getElementById('asrTime').textContent = 'Ошибка';
    document.getElementById('maghribTime').textContent = 'Ошибка';
    document.getElementById('ishaTime').textContent = 'Ошибка';
    document.getElementById('cityName').textContent = 'Не удалось загрузить данные о времени намаза.';
    document.getElementById('currentPrayerInfo').textContent = 'Текущий намаз: Неизвестно (--)';
    /* document.getElementById('currentPrayerEndTime').textContent = '--:--'; */
    document.getElementById('countdown').textContent = '--:--';
  }
}
// Проверяем, есть ли сохраненный город в localStorage
const savedCity = localStorage.getItem('selectedCity') || 'kurah';
const savedCityName = localStorage.getItem('selectedCityName') || 'Курахский район';
loadTodayPrayerTimes(savedCity, savedCityName); // Загружаем время намаза для сохраненного города
// Получаем элементы по их id
const toggleLink = document.getElementById('toggleLink');
const cityList = document.getElementById('cityList');
const cityNameElement = document.getElementById('cityName');
// Добавляем обработчик события клика для заголовка
toggleLink.addEventListener('click', () => {
  // Переключаем видимость списка
  if (cityList.style.display === 'none' || cityList.style.display === '') {
    cityList.style.display = 'block'; // Показываем список
  } else {
    cityList.style.display = 'none'; // Скрываем список
  }
});
// Добавляем обработчик события клика для элементов списка
cityList.addEventListener('click', (event) => {
  // Проверяем, что клик был по элементу <li>
  if (event.target.tagName === 'LI') {
    const fileName = event.target.getAttribute('data-file'); // Получаем имя файла
    const cityName = event.target.getAttribute('data-city-name'); // Получаем название города
    const city = fileName.split('.')[0]; // Например, "makhachkala"
    // Сохраняем выбранный город и его название в localStorage
    localStorage.setItem('selectedCity', city);
    localStorage.setItem('selectedCityName', cityName);
    // Обновляем текст с выбранным городом
    cityNameElement.innerHTML = `<strong>${cityName}</strong>`;
    // Загружаем время намаза для выбранного города
    loadTodayPrayerTimes(city, cityName);
    // Скрываем список городов
    cityList.style.display = 'none';
  }
});
// Добавляем обработчик события клика для текста с выбранным городом
cityNameElement.addEventListener('click', () => {
  const selectedCity = localStorage.getItem('selectedCity') || 'kurah';
  const fileName = `${selectedCity}.min.json`;
  window.location.href = `mounth.html?file=${encodeURIComponent(`js/json/${fileName}`)}`;
});
// Обработчик для ссылки "Посмотреть время намаза на год"
document.getElementById('yearLinkContainer').addEventListener('click', (event) => {
  const selectedCity = localStorage.getItem('selectedCity') || 'kurah';
  window.location.href = `year.html?city=${encodeURIComponent(selectedCity)}`;
});