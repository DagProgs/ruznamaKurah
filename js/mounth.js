// Функция для получения параметра из URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Функция для форматирования времени (например, [4, 5] -> "04:05")
function formatTime(timeArray) {
  const hours = String(timeArray[0]).padStart(2, '0'); // Добавляем ведущий ноль к часам
  const minutes = String(timeArray[1]).padStart(2, '0'); // Добавляем ведущий ноль к минутам
  return `${hours}:${minutes}`;
}

// Функция для преобразования времени в минуты с начала дня
function timeToMinutes(timeArray) {
  return timeArray[0] * 60 + timeArray[1];
}

// Функция для определения текущего намаза и его окончания
function getCurrentPrayer(prayerTimes, currentTime) {
  const prayerNames = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  const prayerNamesRU = {
    'Fajr': 'Фаджр',
    'Sunrise': 'Восход',
    'Dhuhr': 'Зухр',
    'Asr': 'Аср',
    'Maghrib': 'Магриб',
    'Isha': 'Иша'
  };
  let currentPrayer = null;

  for (let i = 0; i < prayerNames.length; i++) {
    const prayerName = prayerNames[i];
    const prayerTime = prayerTimes[prayerName];

    if (currentTime < timeToMinutes(prayerTime)) {
      if (i === 0) {
        // Если текущее время до Фаджра, то предыдущий намаз — Иша
        currentPrayer = {
          name: prayerNamesRU['Isha'],
          startTime: prayerTimes['Isha'],
          endTime: prayerTimes['Fajr']
        };
      } else {
        // В противном случае берем предыдущий намаз
        const previousPrayerName = prayerNames[i - 1];
        currentPrayer = {
          name: prayerNamesRU[previousPrayerName],
          startTime: prayerTimes[previousPrayerName],
          endTime: prayerTimes[prayerName]
        };
      }
      break;
    }
  }

  // Если время после Иши, то текущий намаз — Иша
  if (!currentPrayer) {
    currentPrayer = {
      name: prayerNamesRU['Isha'],
      startTime: prayerTimes['Isha'],
      endTime: prayerTimes['Fajr'] // Иша заканчивается перед следующим Фаджром
    };
  }

  return currentPrayer;
}

// Функция для обновления обратного отсчета
function updateCountdown(endTime, nextPrayerName, prayerTimes, currentDay, monthData, city) {
  const countdownElement = document.getElementById('countdown');
  const intervalId = setInterval(() => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    // Если время переходит через полночь
    let remainingMinutes = endTime - currentMinutes;
    if (remainingMinutes < 0) {
      remainingMinutes += 24 * 60; // Добавляем 24 часа в минутах
    }

    if (remainingMinutes <= 0) {
      // Очищаем интервал
      clearInterval(intervalId);
      // Показываем сообщение о завершении намаза
      countdownElement.textContent = 'Намаз завершен!';
      // Через 1 секунду обновляем данные, но сохраняем город
      setTimeout(() => {
        displayPrayerTimes(prayerTimes, currentDay, city); // Передаем город как параметр
      }, 1000);
    } else {
      const hours = Math.floor(remainingMinutes / 60);
      const minutes = remainingMinutes % 60;
      countdownElement.textContent = `До ${nextPrayerName}а: ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }
  }, 1000); // Обновляем каждую секунду
}

// Функция для отображения данных в таблице
function displayPrayerTimes(data, month, city) {
  const prayerTableBody = document.querySelector('#prayerTable tbody');
  prayerTableBody.innerHTML = ''; // Очищаем таблицу

  // Отображаем название выбранного города на русском языке
  const cityNames = {
    'makhachkala': 'Махачкала',
    'kurah': 'Курахский район',
    'sstalskiy': 'С.Стальский район'
  };
  const cityName = cityNames[city] || 'Неизвестный город';
  document.getElementById('selectedCity').textContent = `${cityName}`;

  // Отображаем текущую дату
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentYear = currentDate.getFullYear();
  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];
  const formattedDate = `Сегодня: ${currentDay} ${monthNames[currentDate.getMonth()]} ${currentYear}`;
  document.getElementById('currentDate').textContent = formattedDate;

  // Получаем данные за выбранный месяц
  const monthData = data[month];

  // Текущее время в минутах с начала дня
  const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();

  // Определяем текущий намаз
  const todayData = monthData[currentDay];
  const currentPrayer = getCurrentPrayer(todayData, currentTime);

  // Отображаем текущий намаз без времени окончания
  const currentPrayerElement = document.getElementById('currentPrayer');
  currentPrayerElement.textContent = `${currentPrayer.name} - ${formatTime(currentPrayer.startTime)}`;

  // Определяем следующий намаз
  const prayerNames = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  const prayerNamesRU = {
    'Fajr': 'Фаджр',
    'Sunrise': 'Восход',
    'Dhuhr': 'Зухр',
    'Asr': 'Аср',
    'Maghrib': 'Магриб',
    'Isha': 'Иша'
  };

  let nextPrayerName = null;
  for (let i = 0; i < prayerNames.length; i++) {
    const prayerName = prayerNames[i];
    const prayerTime = todayData[prayerName];

    if (currentTime < timeToMinutes(prayerTime)) {
      nextPrayerName = prayerNamesRU[prayerName];
      break;
    }
  }

  // Если время после Иши, то следующий намаз — Фаджр
  if (!nextPrayerName) {
    nextPrayerName = 'Фаджр';
  }

  // Запускаем обратный отсчет до конца намаза
  const endTimeInMinutes = timeToMinutes(currentPrayer.endTime);
  updateCountdown(endTimeInMinutes, nextPrayerName, data, month, monthData, city); // Передаем город как параметр

  // Выделяем текущий намаз в заголовке таблицы
  const prayerHeaders = {
    'Фаджр': 'fajrHeader',
    'Восход': 'sunriseHeader',
    'Зухр': 'dhuhrHeader',
    'Аср': 'asrHeader',
    'Магриб': 'maghribHeader',
    'Иша': 'ishaHeader'
  };

  // Убираем выделение у всех заголовков
  for (const headerId of Object.values(prayerHeaders)) {
    document.getElementById(headerId).classList.remove('current-prayer-header');
  }

  // Добавляем выделение для текущего намаза
  const currentPrayerHeaderId = prayerHeaders[currentPrayer.name];
  if (currentPrayerHeaderId) {
    document.getElementById(currentPrayerHeaderId).classList.add('current-prayer-header');
  }

  // Заполняем таблицу данными
  for (const [day, times] of Object.entries(monthData)) {
    const row = document.createElement('tr');

    // Дата (только день)
    const dateCell = document.createElement('td');
    dateCell.textContent = day; // Только день без месяца
    row.appendChild(dateCell);

    // Времена намазов
    for (const name of prayerNames) {
      const cell = document.createElement('td');
      cell.textContent = formatTime(times[name]);
      row.appendChild(cell);
    }

    // Проверяем, является ли текущий день сегодняшним
    if (Number(day) === currentDay) {
      row.classList.add('today'); // Добавляем класс для выделения
    }

    prayerTableBody.appendChild(row);
  }
}

// Основная логика
async function loadAndDisplayPrayerTimes() {
  try {
    // Получаем путь к файлу из параметра URL
    const filePath = getQueryParam('file');
    if (!filePath) {
      throw new Error('Путь к файлу не указан.');
    }

    // Загружаем JSON-файл
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error('Ошибка загрузки файла.');
    }
    const data = await response.json();

    // Определяем текущий месяц (начиная с 1)
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;

    // Определяем название города из пути к файлу
    const fileName = filePath.split('/').pop();
    const cityName = fileName.split('.')[0]; // Например, "makhachkala"

    // Отображаем данные
    displayPrayerTimes(data, currentMonth, cityName);
  } catch (error) {
    console.error('Ошибка:', error);
    alert('Не удалось загрузить данные о времени намаза.');
  }
}

// Загружаем данные при загрузке страницы
window.onload = loadAndDisplayPrayerTimes;