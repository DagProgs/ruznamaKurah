
let isListVisible = false;

// Функция для получения данных из кэша или сети
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

// Проверяем сохраненную территорию
const storedArea = localStorage.getItem('selectedArea');
const storedAreaId = localStorage.getItem('selectedAreaId');
if (storedArea) {
    document.getElementById('selected-area-button').textContent = `Рузнама для: ${storedArea}`;
    document.getElementById('selected-area-button').style.display = 'block';
    document.getElementById('close-button').style.display = 'inline-block';
}

// Обработчик кнопки загрузки списка
document.getElementById('load-button').addEventListener('click', function () {
    const listElement = document.getElementById('territory-list');
    const loadButtonImage = this.querySelector('img');
    if (!isListVisible) {
        getJSONData('times/localization.json')
            .then(data => {
                listElement.innerHTML = '';
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
                listElement.style.display = 'block';
                isListVisible = true;
                loadButtonImage.src = 'img/svg/menu-fold.svg';
            })
            .catch(error => console.error('Ошибка при загрузке данных:', error));
    } else {
        listElement.style.display = 'none';
        isListVisible = false;
        loadButtonImage.src = 'img/svg/menu-add.svg';
    }
});

// Обработчик кнопки закрытия
document.getElementById('close-button').addEventListener('click', function () {
    localStorage.removeItem('selectedArea');
    localStorage.removeItem('selectedAreaId');
    document.getElementById('selected-area-button').style.display = 'none';
    this.style.display = 'none';
});

// Обработчик кнопки выбора территории
document.getElementById('selected-area-button').addEventListener('click', function () {
    const selectedArea = localStorage.getItem('selectedArea');
    const selectedAreaId = localStorage.getItem('selectedAreaId');
    if (selectedArea && selectedAreaId) {
        window.location.href = `times.html?area=${encodeURIComponent(selectedArea)}&id=${selectedAreaId}`;
    }
});