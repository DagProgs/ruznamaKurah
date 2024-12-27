document.addEventListener('DOMContentLoaded', function() {
    const modalls = document.querySelector('#myModalls');
    const videoElement = modalls.querySelector('video'); // Получаем элемент видео
    const openButton = document.querySelector('#myBtnn'); // Кнопка для открытия модального окна

    // Функция для открытия модального окна
    function openModalls() {
        modalls.classList.add('modalls-open');
        attachModallsEvents();
        openButton.style.display = 'none'; // Скрыть кнопку при открытии модального окна
    }

    // Функция для прикрепления событий к модальному окну
    function attachModallsEvents() {
        modalls.querySelector('.closes').addEventListener('click', closesModalls);
        document.addEventListener('keydown', handleEscape);
        modalls.addEventListener('click', handleOutside);
    }

    // Функция для закрытия модального окна
    function closesModalls() {
        modalls.classList.remove('modalls-open');
        videoElement.pause(); // Останавливаем видео
        videoElement.currentTime = 0; // Сбрасываем время видео на начало
        detachModallsEvents();
        openButton.style.display = 'block'; // Показываем кнопку при закрытии модального окна
    }

    // Функция для отсоединения событий от модального окна
    function detachModallsEvents() {
        modalls.querySelector('.closes').removeEventListener('click', closesModalls);
        document.removeEventListener('keydown', handleEscape);
        modalls.removeEventListener('click', handleOutside);
    }

    // Обработчик нажатия клавиши Escape
    function handleEscape(event) {
        if (event.key === 'Escape') {
            closesModalls();
        }
    }

    // Обработчик клика вне модального окна
    function handleOutside(event) {
        const isClickInside = !!event.target.closest('.modalls-content');
        if (!isClickInside) {
            closesModalls();
        }
    }

    // Автоматически открываем модальное окно при загрузке страницы
    openModalls();

    // Добавляем обработчик события для кнопки
    openButton.addEventListener('click', openModalls);
});
    



/* document.addEventListener('DOMContentLoaded', function() {
    const modalls = document.querySelector('#myModalls');

    document.querySelector('#myBtnn').addEventListener('click', openModalls);

    function openModalls() {
        modalls.classList.add('modalls-open');
        attachModallsEvents();
    }

    function attachModallsEvents() {
        modalls.querySelector('.closes').addEventListener('click', closesModalls);
        document.addEventListener('keydown', handleEscape);
        modalls.addEventListener('click', handleOutside);
    }

    function closesModalls() {
        modalls.classList.remove('modalls-open');
        detachModallsEvents();
    }

    function detachModallsEvents() {
        modalls.querySelector('.closes').removeEventListener('click', closesModalls);
        document.removeEventListener('keydown', handleEscape);
        modalls.removeEventListener('click', handleOutside);
    }

    function handleEscape(event) {
        if (event.key === 'Escape') {
            closesModalls();
        }
    }

    function handleOutside(event) {
        const isClickInside = !!event.target.closesst('.modalls-content');
        if (!isClickInside) {
            closesModalls();
        }
    }

    // Открыть модальное окно по умолчанию после загрузки страницы
    openModalls();
});

*/