var day = new Date().getDay(); // Получаем текущий день недели (0 - Воскресенье, 1 - Понедельник, и т.д.)
var daysOfWeek = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
var DayofWeek = daysOfWeek[day];

document.getElementById("week-ru").innerHTML = DayofWeek + " ";