import { Workbox } from 'workbox-v4.3.1/workbox-window.prod.mjs';

if ('serviceWorker' in navigator) {
    const wb = new Workbox('sw-workbox.js');

    wb.addEventListener('installed', event => {
        if (event.isUpdate) {
            window.location.reload();
        }
    });

    wb.register();
}
