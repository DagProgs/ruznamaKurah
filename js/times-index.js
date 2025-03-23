let isListVisible = false; // Отслеживание видимости списка

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
                                document.getElementById('load-button').textContent = `Выбрано: ${item.area}`;
                                listElement.style.display = 'none'; // Скрываем список
                                isListVisible = false; // Обновляем состояние видимости
                                loadButtonImage.src = 'img/svg/menu-add.svg'; // Измените на нужный путь к изображению

                                // Переход на times.html, если данные доступны
                                if (localStorage.getItem('selectedArea') && localStorage.getItem('selectedAreaId')) {
                                    window.location.href = `times.html?area=${encodeURIComponent(item.area)}&id=${item.id}`;
                                } else {
                                    alert('Данные недоступны. Пожалуйста, выберите территорию.');
                                }
                            });

                            listElement.appendChild(li);
                        });
                        listElement.style.display = 'block'; // Показываем список
                        isListVisible = true; // Обновляем состояние видимости
                        loadButtonImage.src = 'img/svg/menu-fold.svg'; // Измените на нужный путь к изображению
                    })
                    .catch(error => console.error('Ошибка при загрузке данных:', error));
            } else {
                listElement.style.display = 'none'; // Скрываем список
                isListVisible = false; // Обновляем состояние видимости
                loadButtonImage.src = 'img/svg/menu-add.svg'; // Измените на нужный путь к изображению
            }
        });