import { Workbox } from 'workbox-window';

if ('serviceWorker' in navigator) {
    const wb = new Workbox('sw-workbox.js');

    wb.addEventListener('installed', event => {
        if (event.isUpdate) {
            wb.messageSW({ type: 'SKIP_WAITING' });
            // Add code to display installation prompt here
            // This will prompt the user to install the updated service worker
        }
    });

    wb.register();
}
