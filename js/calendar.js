const daysOfWeek = [
  'sun', 'mon',
  'tus', 'wed',
  'thu', 'fri',
  'sat'
];

const months = [
  'ЯНВ', 'ФЕВ', 'МАР',
  'АПР', 'МАЙ', 'ИЮН',
  'ИЮЛ', 'АВГ', 'СЕН',
  'ОКТ', 'НОЯ', 'ДЕК',
];

const numericalMonths = [
  '01', '02', '03',
  '04', '05', '06',
  '07', '08', '09',
  '10', '11', '12',
];

const $ = (id) => document.getElementById(id);
const zeroPadding = (num) => String(num).padStart(2, '0');

// Проверяем состояние из localStorage
let isNumeric = localStorage.getItem('isNumeric') === 'true';

function clock() {
  const today = new Date();
  const h = today.getHours();
  const m = today.getMinutes();
  const s = today.getSeconds();
  const day = today.getDay();
  const date = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();

  $('hours').innerHTML = zeroPadding(h);
  $('min').innerHTML = zeroPadding(m);
  $('sec').innerHTML = zeroPadding(s);
  $(daysOfWeek.at(day)).classList.add('active');
  $(daysOfWeek.at((day + 6) % 7)).classList.remove('active');
  $('year').innerHTML = year;
  $('month').innerHTML = isNumeric ? numericalMonths[month] : months[month];
  $('day').innerHTML = zeroPadding(date);
}

function toggleMonth() {
  isNumeric = !isNumeric; // Переключаем состояние
  localStorage.setItem('isNumeric', isNumeric); // Сохраняем новое состояние в localStorage
  clock(); // Обновляем отображение после переключения
}

// Добавляем обработчик события на элемент с id "month"
$('month').addEventListener('click', toggleMonth);

// Первоначальный вызов функции clock для отображения времени
clock();
// Устанавливаем интервал обновления времени каждую секунду
setInterval(clock, 1000);