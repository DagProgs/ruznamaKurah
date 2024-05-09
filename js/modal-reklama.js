document.addEventListener('DOMContentLoaded', function() {
    const modal = document.querySelector('#myModal');

    document.querySelector('#myBtn').addEventListener('click', openModal);

    function openModal() {
        modal.classList.add('modal-open');
        attachModalEvents();
    }

    function attachModalEvents() {
        modal.querySelector('.close').addEventListener('click', closeModal);
        document.addEventListener('keydown', handleEscape);
        modal.addEventListener('click', handleOutside);
    }

    function closeModal() {
        modal.classList.remove('modal-open');
        detachModalEvents();
    }

    function detachModalEvents() {
        modal.querySelector('.close').removeEventListener('click', closeModal);
        document.removeEventListener('keydown', handleEscape);
        modal.removeEventListener('click', handleOutside);
    }

    function handleEscape(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    }

    function handleOutside(event) {
        const isClickInside = !!event.target.closest('.modal-content');
        if (!isClickInside) {
            closeModal();
        }
    }

    // Открыть модальное окно по умолчанию после загрузки страницы
    openModal();
});
