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
        updatePrayerTimesTable();
        monthSelect.value = getCurrentMonth();
    });

function updatePrayerTimesTable() {
    var selectedMonth = monthSelect.value;
    var currentDate = new Date();
    var currentDay = currentDate.getDate();

    // Clear table without losing the reference to existing rows
    tableBody.innerHTML = "";

    for (var day in prayerTimes[selectedMonth]) {
        var row = document.createElement("tr");

        if (day == currentDay && selectedMonth == getCurrentMonth()) {
            row.classList.add('current-day-cell');
            if (previousHighlightedDay) {
                previousHighlightedDay.classList.remove('current-day-cell');
            }
            previousHighlightedDay = row;
        }

        var dayCell = document.createElement("td");
        dayCell.textContent = day;
        row.appendChild(dayCell);

        for (var prayer in prayerTimes[selectedMonth][day]) {
            var time = prayerTimes[selectedMonth][day][prayer];
            var formattedTime = time[0].toString().padStart(2, '0') + ":" + time[1].toString().padStart(2, '0');
            var prayerCell = document.createElement("td");
            prayerCell.textContent = formattedTime;
            row.appendChild(prayerCell);
        }

        tableBody.appendChild(row);
    }
}


monthSelect.addEventListener("change", updatePrayerTimesTable);