import { Workbox } from 'workbox-v4.3.0/workbox-window.prod.mjs';

if ('serviceWorker' in navigator) {
    const wb = new Workbox('sw-workbox.js');

    wb.addEventListener('installed', event => {
        if (event.isUpdate) {
            wb.messageSW({ type: 'SKIP_WAITING' });
        }
    });

    wb.register();
}