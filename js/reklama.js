async function loadContent() {
    const contentDiv = document.getElementById('content');
    try {
        const response = await fetch('https://dagprogs.github.io/apidb/reklama.json');
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
            }
        });
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        contentDiv.style.display = 'none'; // Скрыть блок в случае ошибки
    }
}

loadContent();