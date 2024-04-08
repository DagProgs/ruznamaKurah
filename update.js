import { Workbox } from 'workbox-window';

if ('serviceWorker' in navigator) {
    const wb = new Workbox('sw-workbox.js');

    wb.addEventListener('installed', event => {
        if (event.isUpdate) {
            wb.messageSW({ type: 'SKIP_WAITING' });

            if (confirm('Хотите установить приложение PWA?')) {
                // Если пользователь согласен, то добавляем приложение к домашнему экрану
                // Этот код будет зависеть от вашего приложения и используемой платформы
            }
            
        }
    });

    wb.register();
}


