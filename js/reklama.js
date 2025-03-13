async function loadContent() {
    const contentDiv = document.getElementById('content');
    const errorMessage = document.createElement('p');
    errorMessage.style.color = 'red'; // Стиль для сообщения об ошибке

    try {
        const response = await fetch('https://dagprogs.github.io/apidb/reklama.json');
        console.log('Response status:', response.status); // Вывод статуса ответа

        if (!response.ok) {
            // Если статус ответа не OK, показать сообщение об ошибке
            errorMessage.textContent = 'Нет подключения к интернету или источник недоступен.';
            contentDiv.appendChild(errorMessage);
            return;
        }

        const data = await response.json();

        if (data.length === 0) {
            contentDiv.style.display = 'none'; // Скрыть блок, если данных нет
            return;
        }

        data.forEach(item => {
            if (item.type === 'text') {
                const p = document.createElement('p');
                p.textContent = item.content;
                contentDiv.appendChild(p);
            } else if (item.type === 'image') {
                const img = document.createElement('img');
                img.src = item.src;
                contentDiv.appendChild(img);
            } else if (item.type === 'video') {
                const video = document.createElement('video');
                video.src = item.src;
                video.controls = true; // Включить управление для видео
                video.style.width = '100%'; // Установить ширину видео на 100%
                video.style.height = 'auto'; // Установить высоту на auto
                contentDiv.appendChild(video);
            } else if (item.type === 'audio') {
                const audio = document.createElement('audio');
                audio.src = item.src;
                audio.controls = true; // Включить управление для аудио
                contentDiv.appendChild(audio);
            } else if (item.type === 'youtube') {
                const iframe = document.createElement('iframe');
                iframe.src = item.src;
                iframe.width = '100%'; // Установить ширину iframe на 100%
                iframe.height = '315'; // Установить высоту iframe
                iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'; // Разрешения
                iframe.allowFullscreen = true; // Разрешить полноэкранный режим
                contentDiv.appendChild(iframe);
            }
        });
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        errorMessage.textContent = 'Ошибка при загрузке данных. Попробуйте позже.';
        contentDiv.appendChild(errorMessage); // Показать сообщение об ошибке
    }
}

loadContent();
