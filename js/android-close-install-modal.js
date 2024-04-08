let deferredPrompt;

        window.addEventListener('beforeinstallprompt', (event) => {
            console.log('Received beforeinstallprompt event', event);
            event.preventDefault();
            deferredPrompt = event;
            showInstallButton();
        });

        function showInstallButton() {
            const modal = document.getElementById('pwaModal');
            modal.style.display = 'block';

            modal.querySelector('#installPWAButton').onclick = function () {
                if (deferredPrompt) {
                    deferredPrompt.prompt();
                    deferredPrompt.userChoice
                        .then((choiceResult) => {
                            if (choiceResult.outcome === 'accepted') {
                                console.log('User accepted the PWA installation');
                            } else {
                                console.log('User declined the PWA installation');
                            }
                            deferredPrompt = null;
                            modal.style.display = 'none';
                        })
                        .catch((error) => {
                            console.error('Error during PWA installation:', error);
                        });
                }
            };
        }

        document.querySelector('.close').onclick = function () {
            document.getElementById('pwaModal').style.display = 'none';
        };

        // Обработчик события для отправки команды установки PWA в сервис-воркер
        document.getElementById('installPWAButton').onclick = function () {
            if (navigator.serviceWorker && navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage('installPWA');
            }
        };