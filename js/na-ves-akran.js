const url = 'https://dagprogs.github.io/apidb/page.json';

function fetchData() {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Сеть не доступна');
            }
            return response.json();
        })
        .then(data => {
            const currentDate = new Date();
            const expiryDate = new Date(data.expiryDate);

            // Сохраняем данные в localStorage
            localStorage.setItem('pageData', JSON.stringify(data));

            // Проверяем, не прошла ли дата
            if (currentDate <= expiryDate) {
                displayData(data);
            } else {
                hideOverlay();
            }
        })
        .catch(error => {
            console.error('Ошибка загрузки данных:', error);
            // Если ошибка, загружаем данные из localStorage
            const cachedData = localStorage.getItem('pageData');
            if (cachedData) {
                const data = JSON.parse(cachedData);
                const expiryDate = new Date(data.expiryDate);
                if (currentDate <= expiryDate) {
                    displayData(data);
                } else {
                    hideOverlay();
                }
            }
        });
}

function displayData(data) {
    document.getElementById('title').innerText = data.title;
    document.getElementById('image').src = data.image;
    document.getElementById('text').innerText = data.text;
    document.getElementById('overlay').style.display = 'flex'; // Показываем оверлей
}

function hideOverlay() {
    document.getElementById('overlay').style.display = 'none'; // Скрываем оверлей
}

// Вызываем функцию для загрузки данных
fetchData();
