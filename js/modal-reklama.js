document.addEventListener('DOMContentLoaded', function() {
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
