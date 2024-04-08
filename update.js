import { Workbox } from 'https://storage.googleapis.com/workbox-cdn/releases/4.3.0/workbox-window.prod.mjs';

if ('serviceWorker' in navigator) {
    const wb = new Workbox('sw-workbox.js');

    wb.addEventListener('installed', event => {
        if (event.isUpdate) {
            window.location.reload();
        }
    });

    wb.register();
}
