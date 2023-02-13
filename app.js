navigator.serviceWorker
    .register('./sw.js')
    .then(function (reg) {
        console.log('Service Worker Registered');
    });

setTimeout(() => {
    const img = new Image();
    img.src = 'img/icons/icon-512x512.png';
    document.body.appendChild(img);
}, 1000);
setTimeout(() => {
    const img = new Image();
    img.src = 'img/rolling-dots.gif';
    document.body.appendChild(img);
}, 1000);