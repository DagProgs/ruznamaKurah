async function loadContent() {
    const contentDiv = document.getElementById('content');
    const errorMessage = document.createElement('p');
    errorMessage.style.color = 'red'; // Style the error message

    try {
        const response = await fetch('https://dagprogs.github.io/apidb/reklama.json');

        if (!response.ok) {
            // If the response status is not OK, show an error message
            errorMessage.textContent = 'Нет подключения к интернету или источник недоступен.';
            contentDiv.appendChild(errorMessage);
            return;
        }

        const data = await response.json();

        if (data.length === 0) {
            contentDiv.style.display = 'none'; // Hide the block if no data is present
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
                video.controls = true; // Enable controls for the video
                contentDiv.appendChild(video);
            } else if (item.type === 'audio') {
                const audio = document.createElement('audio');
                audio.src = item.src;
                audio.controls = true; // Enable controls for the audio
                contentDiv.appendChild(audio);
            }
        });
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        errorMessage.textContent = 'Нет подключения к интернету.';
        contentDiv.appendChild(errorMessage); // Show the error message
    }
}

loadContent();
