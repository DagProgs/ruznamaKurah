fetch(`timesprayer/${areaId}/${currentMonth}.json`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Сеть ответила с ошибкой: ' + response.status);
        }
        return response.json();
    })
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
    .catch(error => {
        console.error('Ошибка при загрузке данных времени:', error);
        const cachedData = JSON.parse(localStorage.getItem(`cachedTimes_${areaId}_${currentMonth}`));
        if (cachedData) {
            const timesList = document.getElementById('times-list');
            timesList.innerHTML = '';
            cachedData.array.forEach(item => {
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
        } else {
            document.getElementById('selected-area').textContent = 'Данные недоступны. Проверьте подключение к интернету.';
        }
    });

// Сохраняем данные в localStorage при успешной загрузке
fetch(`timesprayer/${areaId}/${currentMonth}.json`)
    .then(response => response.json())
    .then(data => localStorage.setItem(`cachedTimes_${areaId}_${currentMonth}`, JSON.stringify(data)))
    .catch(() => {});