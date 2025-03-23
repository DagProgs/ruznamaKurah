<script>
function getCurrentMonth() {
    const date = new Date();
    const options = { month: 'long', year: 'numeric' };
    return date.toLocaleDateString('ru-RU', options);
}

document.getElementById('current-month').textContent = `Сегодня: ${new Date().getDate()} ${getCurrentMonth()}`;

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const area = getUrlParameter('area');
const areaId = getUrlParameter('id');

if (area && areaId) {
    document.getElementById('selected-area').textContent = `${area}`;

    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1;

    function getJSONData(url) {
      return new Promise((resolve, reject) => {
        caches.match(url)
          .then(response => {
            if (response) {
              return response.json();
            } else {
              return fetch(url).then(response => response.json());
            }
          })
          .then(data => resolve(data))
          .catch(error => reject(error));
      });
    }

    getJSONData(`times/${areaId}/${currentMonth}.json`)
        .then(data => {
            const timesList = document.getElementById('times-list');
            timesList.innerHTML = '';
            data.array.forEach(item => {
                const dateParts = item.date.split('-');
                const day = parseInt(dateParts[2]);
                const row = document.createElement('tr');
                if (day === currentDay) {
                    row.classList.add('today');
                }
                row.innerHTML = `
                    <td>${day}</td>
                    <td>${item.times.fajr}</td>
                    <td>${item.times.sunrise}</td>
                    <td>${item.times.dhuhr}</td>
                    <td>${item.times.asr}</td>
                    <td>${item.times.maghrib}</td>
                    <td>${item.times.night}</td>
                `;
                timesList.appendChild(row);
            });
        })
        .catch(error => console.error('Ошибка при загрузке данных времени:', error));
} else {
    document.getElementById('selected-area').textContent = 'Выбор области не был сделан.';
}
</script>