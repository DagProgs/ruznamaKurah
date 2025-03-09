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
                contentDiv.appendChild(video);
            } else if (item.type === 'audio') {
                const audio = document.createElement('audio');
                audio.src = item.src;
                audio.controls = true; // Включить управление для аудио
                contentDiv.appendChild(audio);
            }
        });
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        errorMessage.textContent = 'Ошибка при загрузке данных. Попробуйте позже.';
        contentDiv.appendChild(errorMessage); // Показать сообщение об ошибке
    }
}

loadContent();
