// Глобальная переменная для хранения интервала таймера
let timerInterval = null;

// Объект для хранения данных всех городов
const cityDataCache = {};

// Список всех доступных городов
const allCities = ['kurah', 's.stalsk', 'derbent', 'izberbash', 'makhachkala', 'kaspiysk'];

// Функция для показа индикатора загрузки
function showLoadingIndicator() {
  document.querySelectorAll('.prayer-time p').forEach(el => {
    el.textContent = 'Загрузка...';
  });
}

// Функция для загрузки данных JSON
async function loadPrayerTimes(city) {
  try {
    console.log(`Загрузка данных для города: ${city}`);
    const response = await fetch(`data/${city}.json`);
    if (!response.ok) {
      throw new Error(`Ошибка при загрузке файла: ${response.status}`);
    }
    const data = await response.json();

    // Проверяем, что данные содержат информацию для текущего месяца и дня
    const now = new Date();
    const month = String(now.getMonth() + 1); // Месяцы начинаются с 0
    const day = String(now.getDate()); // День месяца без ведущего нуля

    if (!data[month] || !data[month][day]) {
      throw new Error(`Нет данных для даты: ${month}-${day} в городе ${city}`);
    }

    // Сохраняем данные в кэш
    cityDataCache[city] = data;
    console.log(`Данные для города ${city} успешно загружены и сохранены в кэше.`);
  } catch (error) {
    console.error(`Ошибка при загрузке данных для города ${city}:`, error.message);
  }
}

// Функция для загрузки данных для города по умолчанию
async function loadDefaultCityData(defaultCity) {
  // Показываем индикатор загрузки
  showLoadingIndicator();

  try {
    // Загружаем данные для города по умолчанию
    await loadPrayerTimes(defaultCity);

    // Обновляем интерфейс
    updateUI(defaultCity);
  } catch (error) {
    console.error(`Ошибка при загрузке данных для города по умолчанию:`, error.message);
    alert(`Ошибка: ${error.message}`);
  }

  // Загружаем данные для остальных городов в фоновом режиме
  preloadOtherCities(defaultCity);
}

// Функция для предварительной загрузки данных для остальных городов
async function preloadOtherCities(defaultCity) {
  for (const city of allCities) {
    if (city !== defaultCity && !cityDataCache[city]) {
      await loadPrayerTimes(city);
    }
  }
}

// Функция для обновления интерфейса при выборе города
function updateUI(city) {
  const now = new Date();
  const month = String(now.getMonth() + 1); // Месяцы начинаются с 0
  const day = String(now.getDate()); // День месяца без ведущего нуля

  // Проверка наличия данных для текущего месяца и дня
  const data = cityDataCache[city];
  if (!data || !data[month] || !data[month][day]) {
    console.error(`Нет данных для даты: ${month}-${day} в городе ${city}`);
    alert(`Нет данных для даты: ${month}-${day} в городе ${city}`);
    return;
  }

  const prayerTimes = data[month][day];

  // Очищаем предыдущий таймер, если он существует
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  // Обновление времени намазов на странице
  updatePrayerTimes(prayerTimes);

  // Обновляем название выбранного города
  updateCurrentCityName(city);

  // Определяем и выделяем текущий намаз
  highlightCurrentPrayer(prayerTimes);

  // Запускаем таймер для обновления времени до следующего намаза
  startNextPrayerTimer(prayerTimes);
}

// Функция для обновления времени намазов на странице
function updatePrayerTimes(prayerTimes) {
  document.getElementById('fajrTime').textContent = formatTime(prayerTimes.Fajr);
  document.getElementById('sunriseTime').textContent = formatTime(prayerTimes.Sunrise);
  document.getElementById('dhuhrTime').textContent = formatTime(prayerTimes.Dhuhr);
  document.getElementById('asrTime').textContent = formatTime(prayerTimes.Asr);
  document.getElementById('maghribTime').textContent = formatTime(prayerTimes.Maghrib);
  document.getElementById('ishaTime').textContent = formatTime(prayerTimes.Isha);
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

// Функция для обновления названия текущего города
function updateCurrentCityName(cityCode) {
  const cityNames = {
    kurah: 'Курахский район',
    's.stalsk': 'С.Стальский район',
    derbent: 'Дербент',
    izberbash: 'Избербаш',
    makhachkala: 'Махачкала',
    kaspiysk: 'Каспийск'
  };
  const cityName = cityNames[cityCode] || 'Неизвестный город';
  document.getElementById('currentCity').textContent = `${cityName}`;
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
    if (cityDataCache[selectedCity]) {
      updateUI(selectedCity);
    } else {
      loadPrayerTimes(selectedCity).then(() => updateUI(selectedCity));
    }
    cityList.parentElement.style.display = 'none'; // Скрываем список после выбора
  }
});

// Загрузка данных для первого города при загрузке страницы
window.onload = function () {
  const defaultCity = 'kurah'; // Первый город по умолчанию
  loadDefaultCityData(defaultCity);
};

// Функция для определения текущего намаза
function highlightCurrentPrayer(prayerTimes) {
  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();

  // Преобразуем время намазов в минуты с начала дня
  const timesInMinutes = {
    Fajr: prayerTimes.Fajr[0] * 60 + prayerTimes.Fajr[1],
    Sunrise: prayerTimes.Sunrise[0] * 60 + prayerTimes.Sunrise[1],
    Dhuhr: prayerTimes.Dhuhr[0] * 60 + prayerTimes.Dhuhr[1],
    Asr: prayerTimes.Asr[0] * 60 + prayerTimes.Asr[1],
    Maghrib: prayerTimes.Maghrib[0] * 60 + prayerTimes.Maghrib[1],
    Isha: prayerTimes.Isha[0] * 60 + prayerTimes.Isha[1]
  };

  // Текущее время в минутах
  const currentTimeInMinutes = currentHours * 60 + currentMinutes;

  // Очищаем предыдущие выделения
  document.querySelectorAll('.prayer-time p').forEach(el => el.classList.remove('current-prayer'));

  // Определяем текущий намаз
  let currentPrayerName = '';
  let currentPrayerTime = '';

  if (currentTimeInMinutes < timesInMinutes.Sunrise) {
    currentPrayerName = 'Фаджр';
    currentPrayerTime = formatTime(prayerTimes.Fajr);
    document.getElementById('fajrTime').classList.add('current-prayer');
  } else if (currentTimeInMinutes < timesInMinutes.Dhuhr) {
    currentPrayerName = 'Шурук';
    currentPrayerTime = formatTime(prayerTimes.Sunrise);
    document.getElementById('sunriseTime').classList.add('current-prayer');
  } else if (currentTimeInMinutes < timesInMinutes.Asr) {
    currentPrayerName = 'Зухр';
    currentPrayerTime = formatTime(prayerTimes.Dhuhr);
    document.getElementById('dhuhrTime').classList.add('current-prayer');
  } else if (currentTimeInMinutes < timesInMinutes.Maghrib) {
    currentPrayerName = 'Аср';
    currentPrayerTime = formatTime(prayerTimes.Asr);
    document.getElementById('asrTime').classList.add('current-prayer');
  } else if (currentTimeInMinutes < timesInMinutes.Isha) {
    currentPrayerName = 'Магриб';
    currentPrayerTime = formatTime(prayerTimes.Maghrib);
    document.getElementById('maghribTime').classList.add('current-prayer');
  } else {
    currentPrayerName = 'Иша';
    currentPrayerTime = formatTime(prayerTimes.Isha);
    document.getElementById('ishaTime').classList.add('current-prayer');
  }

  // Обновляем блок с текущим намазом
  document.getElementById('currentPrayerName').textContent = currentPrayerName;
  document.getElementById('currentPrayerTime').textContent = currentPrayerTime;
}

// Функция для запуска таймера до следующего намаза
function startNextPrayerTimer(prayerTimes) {
  const r = ["Фаджр", "Шурук", "Зухр", "Аср", "Магриб", "Иша"];
  const n = { "Фаджр": "Fajr", "Шурук": "Sunrise", "Зухр": "Dhuhr", "Аср": "Asr", "Магриб": "Maghrib", "Иша": "Isha" };
  const i = {};

  const now = new Date();
  const currentMinutes = 60 * now.getHours() + now.getMinutes();

  // Преобразуем время намазов в минуты с начала дня
  r.forEach(function (e) {
    const t = n[e];
    if (t && prayerTimes[t]) {
      i[e] = 60 * prayerTimes[t][0] + prayerTimes[t][1];
    }
  });

  function updateNextPrayer() {
    const now = new Date();
    const currentMinutes = 60 * now.getHours() + now.getMinutes();
    const nextPrayerText = document.getElementById("nextPrayerText");
    const nextPrayerTime = document.getElementById("nextPrayerTime");
    const redLine = document.getElementById("redLine");

    let nextPrayerName = '';
    let nextPrayerTimeDiff = Infinity;

    for (let u = 0; u < r.length; u++) {
      const c = r[u];
      const p = i[c];
      if (p > currentMinutes) {
        const diff = p - currentMinutes;
        if (diff < nextPrayerTimeDiff) {
          nextPrayerTimeDiff = diff;
          nextPrayerName = c;
        }
      }
    }

    if (nextPrayerName) {
      const remainingTime = Math.floor(nextPrayerTimeDiff / 60).toString().padStart(2, "0") + ":" + (nextPrayerTimeDiff % 60).toString().padStart(2, "0");
      nextPrayerText.textContent = `До ${nextPrayerName}а`;
      nextPrayerTime.textContent = remainingTime;

      const progress = (nextPrayerTimeDiff / (i[nextPrayerName] - i[r[r.indexOf(nextPrayerName) - 1]])) * 100;
      redLine.style.width = 100 - progress + "%";
    } else {
      const remainingTime = Math.floor((i["Фаджр"] + 1440 - currentMinutes) / 60).toString().padStart(2, "0") + ":" + ((i["Фаджр"] + 1440 - currentMinutes) % 60).toString().padStart(2, "0");
      nextPrayerText.textContent = "До Фаджра";
      nextPrayerTime.textContent = remainingTime;
      redLine.style.width = "0%";
    }

    // Обновляем текущий намаз в реальном времени
    highlightCurrentPrayer(prayerTimes);
  }

  // Запускаем новый таймер
  timerInterval = setInterval(updateNextPrayer, 1000); // Обновляем каждую секунду
  updateNextPrayer(); // Вызов функции сразу при загрузке
}