let isListVisible = false; // Отслеживание видимости списка

// Проверяем, есть ли сохраненная территория в localStorage
const storedArea = localStorage.getItem('selectedArea');
const storedAreaId = localStorage.getItem('selectedAreaId'); // Сохраняем ID территории
if (storedArea) {
    document.getElementById('selected-area-button').textContent = `Выбрано: ${storedArea}`;
    document.getElementById('selected-area-button').style.display = 'block'; // Показываем кнопку, если территория выбрана
    document.getElementById('close-button').style.display = 'inline-block'; // Показываем кнопку закрытия
}

// Обработчик для кнопки загрузки списка
document.getElementById('load-button').addEventListener('click', function () {
    const listElement = document.getElementById('territory-list');
    const loadButtonImage = this.querySelector('img'); // Получаем изображение внутри кнопки

    if (!isListVisible) {
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
                        localStorage.setItem('selectedAreaId', item.id); // Сохраняем ID
                        document.getElementById('selected-area-button').textContent = `Выбрано: ${item.area}`;
                        document.getElementById('selected-area-button').style.display = 'block'; // Показываем кнопку
                        document.getElementById('close-button').style.display = 'inline-block'; // Показываем кнопку закрытия
                        window.location.href = `times.html?area=${encodeURIComponent(item.area)}&id=${item.id}`;
                    });

                    listElement.appendChild(li);
                });
                listElement.style.display = 'block'; // Показываем список
                isListVisible = true; // Обновляем состояние видимости
                loadButtonImage.src = 'img/svg/menu-fold.svg'; // Измените на нужный путь к изображению
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных:', error);
                // Попробуем загрузить данные из localStorage, если они доступны
                if (storedArea) {
                    const li = document.createElement('li');
                    li.textContent = storedArea;
                    listElement.appendChild(li);
                    listElement.style.display = 'block'; // Показываем список
                    isListVisible = true; // Обновляем состояние видимости
                    loadButtonImage.src = 'img/svg/menu-fold.svg'; // Измените на нужный путь к изображению
                } else {
                    alert('Не удалось загрузить данные и нет кэшированных данных.'); // Сообщение пользователю
                }
            });
    } else {
        listElement.style.display = 'none'; // Скрываем список
        isListVisible = false; // Обновляем состояние видимости
        loadButtonImage.src = 'img/svg/menu-add.svg'; // Измените на нужный путь к изображению
    }
});

// Обработчик для кнопки закрытия
document.getElementById('close-button').addEventListener('click', function () {
    localStorage.removeItem('selectedArea');
    localStorage.removeItem('selectedAreaId');
    document.getElementById('selected-area-button').style.display = 'none'; // Скрываем кнопку выбора
    this.style.display = 'none'; // Скрываем кнопку закрытия
});

// Обработчик для кнопки выбора территории
document.getElementById('selected-area-button').addEventListener('click', function () {
    const selectedArea = localStorage.getItem('selectedArea');
    const selectedAreaId = localStorage.getItem('selectedAreaId');
    if (selectedArea && selectedAreaId) {
        window.location.href = `times.html?area=${encodeURIComponent(selectedArea)}&id=${selectedAreaId}`;
    }
});
