var monthSelect = document.getElementById("monthSelect");
var tableBody = document.getElementById("prayerTimesTableBody");
var prayerTimes;
var previousHighlightedDay;

function getCurrentMonth() {
    var currentDate = new Date();
    return currentDate.getMonth() + 1;
}

fetch('js/json/prayer-times.json')
    .then(response => response.json())
    .then(data => {
        prayerTimes = data;
        monthSelect.value = getCurrentMonth();
        updatePrayerTimesTable();
    });

function updatePrayerTimesTable() {
    var selectedMonth = monthSelect.value;
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth() + 1;

    // Отобразить текущий месяц
    document.getElementById("currentMonth").textContent = "Месяц: " + currentMonth;

    var currentDay = currentDate.getDate();

    // Clear table without losing the reference to existing rows
    tableBody.innerHTML = "";

    for (var day in prayerTimes[selectedMonth]) {
        // Ensure that 'day' is a number
        day = parseInt(day);

        // Check if the day is within the month's range
        if (!isNaN(day)) {
            var row = document.createElement("tr");

            if (day === currentDay && parseInt(selectedMonth) === currentMonth) {
                row.classList.add('current-day-cell');
                if (previousHighlightedDay) {
                    previousHighlightedDay.classList.remove('current-day-cell');
                }
                previousHighlightedDay = row;
            }

            var dayCell = document.createElement("td");
            var formattedDate = selectedMonth + "/" + day;
            dayCell.textContent = formattedDate;
            row.appendChild(dayCell);

            var prayers = prayerTimes[selectedMonth][day];
            for (var prayer in prayers) {
                var time = prayers[prayer];
                var formattedTime = time[0].toString().padStart(2, '0') + ":" + time[1].toString().padStart(2, '0');
                var prayerCell = document.createElement("td");
                prayerCell.textContent = formattedTime;
                row.appendChild(prayerCell);
            }

            tableBody.appendChild(row);
        }
    }
}

monthSelect.addEventListener("change", updatePrayerTimesTable);
