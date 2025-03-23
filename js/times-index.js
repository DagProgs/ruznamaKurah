document.getElementById('load-button').addEventListener('click', function () {
    const listElement = document.getElementById('territory-list');
    const loadButtonImage = this.querySelector('img');

    if (!isListVisible) {
        if (navigator.onLine) { // Проверяем, есть ли интернет
            fetch('timesprayer/localization.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Ошибка сети: ' + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    listElement.innerHTML = ''; // Очищаем любые существующие элементы
                    data.territory.forEach(item => {
                        const li = document.createElement('li');
                        li.textContent = item.area;

                        li.addEventListener('click', function () {
                            localStorage.setItem('selectedArea', item.area);
                            localStorage.setItem('selectedAreaId', item.id);
                            document.getElementById('selected-area-button').textContent = `Выбрано: ${item.area}`;
                            document.getElementById('selected-area-button').style.display = 'block';
                            document.getElementById('close-button').style.display = 'inline-block';
                            window.location.href = `times.html?area=${encodeURIComponent(item.area)}&id=${item.id}`;
                        });

                        listElement.appendChild(li);
                    });
                    listElement.style.display = 'block'; // Показываем список
                    isListVisible = true; // Обновляем состояние видимости
                    loadButtonImage.src = 'img/svg/menu-fold.svg'; // Измените на нужный путь к изображению

                    // Сохраняем данные в localStorage для офлайн-доступа
                    localStorage.setItem('territories', JSON.stringify(data.territory));
                })
                .catch(error => {
                    console.error('Ошибка при загрузке данных:', error);
                    loadOfflineData(listElement); // Загружаем данные из localStorage
                });
        } else {
            loadOfflineData(listElement); // Загружаем данные из localStorage
        }
    } else {
        listElement.style.display = 'none'; // Скрываем список
        isListVisible = false; // Обновляем состояние видимости
        loadButtonImage.src = 'img/svg/menu-add.svg'; // Измените на нужный путь к изображению
    }
});

function loadOfflineData(listElement) {
    const territories = JSON.parse(localStorage.getItem('territories'));
    if (territories) {
        listElement.innerHTML = ''; // Очищаем любые существующие элементы
        territories.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.area;

            li.addEventListener('click', function () {
                localStorage.setItem('selectedArea', item.area);
                localStorage.setItem('selectedAreaId', item.id);
                document.getElementById('selected-area-button').textContent = `Выбрано: ${item.area}`;
                document.getElementById('selected-area-button').style.display = 'block';
                document.getElementById('close-button').style.display = 'inline-block';
                window.location.href = `times.html?area=${encodeURIComponent(item.area)}&id=${item.id}`;
            });

            listElement.appendChild(li);
        });
        listElement.style.display = 'block'; // Показываем список
    } else {
        alert('Нет данных для отображения. Пожалуйста, подключитесь к интернету для загрузки данных.');
    }
}
