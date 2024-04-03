import { Workbox } from 'https://storage.googleapis.com/workbox-cdn/releases/4.3.0/workbox-window.prod.mjs';

if (!localStorage.getItem('appInstalled') && !window.matchMedia('(display-mode: standalone)').matches && /iPhone|iPod/i.test(navigator.userAgent)) {
    // Открываем модальное окно только на устройствах iPhone
    document.getElementById('myModal').style.display = "block";
    localStorage.setItem('appInstalled', 'true');
}

// Закрытие модального окна при нажатии на кнопку "Close"
document.getElementsByClassName("close")[0].onclick = function() {
    document.getElementById('myModal').style.display = "none";
}

if ('serviceWorker' in navigator) {
    const wb = new Workbox('sw-workbox.js');

    wb.addEventListener('installed', event => {
        if (event.isUpdate) {
            if (confirm(`Мы только что обновили версию приложения! Чтобы получить обновления, нажмите на кнопку OK.`)) {
                window.location.reload();
            } else {
                alert(`Вы отказались от обновления приложения. Для получения новых возможностей перезагрузите страницу в будущем.`);
            }
        } else {
            alert(`Приложение готово к работе в автономном режиме`);
        }
    });

    wb.register();
}
