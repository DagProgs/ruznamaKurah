const calendarContainer = document.getElementById('calendar');
const calendarTitle = document.getElementById('calendar-title');
const months = [
  { name: 'Январь', days: 31 },
  { name: 'Февраль', days: 28 }, // Не учитываем високосный год для простоты
  { name: 'Март', days: 31 },
  { name: 'Апрель', days: 30 },
  { name: 'Май', days: 31 },
  { name: 'Июнь', days: 30 },
  { name: 'Июль', days: 31 },
  { name: 'Август', days: 31 },
  { name: 'Сентябрь', days: 30 },
  { name: 'Октябрь', days: 31 },
  { name: 'Ноябрь', days: 30 },
  { name: 'Декабрь', days: 31 }
];

// Получаем текущую дату
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth(); // 0 - Январь, 11 - Декабрь
const currentDate = today.getDate();

// Обновляем заголовок с текущим числом
calendarTitle.innerText = `Календарь на ${currentYear} год. Сегодня: ${currentDate} ${months[currentMonth].name}`;

// Названия дней недели
const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

// Функция для создания месяца
function createMonth(month, index) {
  const monthDiv = document.createElement('div');
  monthDiv.classList.add('month');

  const monthTitle = document.createElement('h2');
  monthTitle.innerText = month.name;
  monthDiv.appendChild(monthTitle);

  const daysDiv = document.createElement('div');
  daysDiv.classList.add('days');

  // Добавляем названия дней недели
  const weekdaysDiv = document.createElement('div');
  weekdaysDiv.classList.add('weekdays');
  weekdays.forEach(weekday => {
    const weekdayDiv = document.createElement('div');
    weekdayDiv.classList.add('weekday');

    // Выделяем "Сб" и "Вс" цветом
    if (weekday === 'Сб' || weekday === 'Вс') {
      weekdayDiv.innerHTML = `<span class="weekend">${weekday}</span>`;
    } else {
      weekdayDiv.innerText = weekday;
    }

    weekdaysDiv.appendChild(weekdayDiv);
  });
  daysDiv.appendChild(weekdaysDiv);

  // Вычисляем первый день месяца
  const firstDay = new Date(currentYear, index, 1).getDay(); // 0 - Воскресенье, 6 - Суббота
  const adjustedFirstDay = (firstDay === 0) ? 6 : firstDay - 1; // Преобразуем воскресенье (0) в 6 (суббота)

  // Заполняем пустые дни перед первым числом месяца
  for (let i = 0; i < adjustedFirstDay; i++) {
    const emptyDay = document.createElement('div');
    emptyDay.classList.add('day', 'empty');
    daysDiv.appendChild(emptyDay);
  }

  // Заполняем дни месяца
  for (let day = 1; day <= month.days; day++) {
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('day');
    dayDiv.innerText = day;

    // Проверяем, является ли день сегодняшним
    if (day === currentDate && index === currentMonth) {
      dayDiv.classList.add('today');
    }

    daysDiv.appendChild(dayDiv);
  }

  monthDiv.appendChild(daysDiv);
  return monthDiv;
}

// Добавляем текущий месяц в верхнюю часть
const currentMonthDiv = createMonth(months[currentMonth], currentMonth);
currentMonthDiv.classList.add('current-month'); // Добавляем класс для текущего месяца
calendarContainer.appendChild(currentMonthDiv);

// Создаем и добавляем остальные месяцы в 4 ряда
const monthContainer = document.createElement('div');
monthContainer.classList.add('month-container');

// Добавляем все месяцы
months.forEach((month, index) => {
  const monthDiv = createMonth(month, index);
  monthContainer.appendChild(monthDiv);
});

// Добавляем контейнер с месяцами в календарь
calendarContainer.appendChild(monthContainer);