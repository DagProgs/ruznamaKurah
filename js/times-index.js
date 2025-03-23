 let isListVisible = false; // Отслеживание видимости списка

        // Обработчик для кнопки загрузки списка
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
                        listElement.innerHTML = ''; // Очищаем любые существующие элементы
                        data.territory.forEach(item => {
                            const li = document.createElement('li');
                            li.textContent = item.area;

                            li.addEventListener('click', function () {
                                localStorage.setItem('selectedArea', item.area);
                                localStorage.setItem('selectedAreaId', item.id); // Сохраняем ID
                                window.location.href = `times.html?area=${encodeURIComponent(item.area)}&id=${item.id}`;
                            });

                            listElement.appendChild(li);
                        });
                        listElement.style.display = 'block'; // Показываем список
                        isListVisible = true; // Обновляем состояние видимости
                    })
                    .catch(error => console.error('Ошибка при загрузке данных:', error));
            } else {
                listElement.style.display = 'none'; // Скрываем список
                isListVisible = false; // Обновляем состояние видимости
            }
        });

        // Обработчик для кнопки закрытия
        document.getElementById('close-button').addEventListener('click', function () {
            localStorage.removeItem('selectedArea');
            localStorage.removeItem('selectedAreaId');
            document.getElementById('selected-area-button').style.display = 'none'; // Скрываем кнопку выбора
            this.style.display = 'none'; // Скрываем кнопку закрытия
        });