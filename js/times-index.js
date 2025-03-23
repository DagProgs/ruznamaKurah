document.getElementById('load-button').addEventListener('click', function () {
    const listElement = document.getElementById('territory-list');
    if (!isListVisible) {
        fetch('timesprayer/localization.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка сети: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                listElement.innerHTML = '';
                data.territory.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item.area;
                    li.addEventListener('click', function () {
                        localStorage.setItem('selectedArea', item.area);
                        localStorage.setItem('selectedAreaId', item.id);
                        window.location.href = `times.html?area=${encodeURIComponent(item.area)}&id=${item.id}`;
                    });
                    listElement.appendChild(li);
                });
                listElement.style.display = 'block';
                isListVisible = true;
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных:', error);
                // Используем закэшированные данные
                const cachedData = JSON.parse(localStorage.getItem('cachedTerritories'));
                if (cachedData) {
                    listElement.innerHTML = '';
                    cachedData.territory.forEach(item => {
                        const li = document.createElement('li');
                        li.textContent = item.area;
                        li.addEventListener('click', function () {
                            localStorage.setItem('selectedArea', item.area);
                            localStorage.setItem('selectedAreaId', item.id);
                            window.location.href = `times.html?area=${encodeURIComponent(item.area)}&id=${item.id}`;
                        });
                        listElement.appendChild(li);
                    });
                    listElement.style.display = 'block';
                    isListVisible = true;
                } else {
                    alert('Данные недоступны. Проверьте подключение к интернету.');
                }
            });
    } else {
        listElement.style.display = 'none';
        isListVisible = false;
    }
});

// Сохраняем данные в localStorage при успешной загрузке
fetch('timesprayer/localization.json')
    .then(response => response.json())
    .then(data => localStorage.setItem('cachedTerritories', JSON.stringify(data)))
    .catch(() => {});