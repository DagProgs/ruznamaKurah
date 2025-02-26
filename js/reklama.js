async function loadContent() {
  try {
      const response = await fetch('https://dagprogs.github.io/apidb/reklama.json');
      const data = await response.json();
      const contentDiv = document.getElementById('content');

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
  }
}

loadContent();