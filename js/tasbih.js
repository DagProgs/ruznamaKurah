let count = localStorage.getItem('count') ? parseInt(localStorage.getItem('count')) : 0;
let isSoundOn = true; // Переменная для отслеживания состояния звука
const counter = document.getElementById('counter');
const countButton = document.getElementById('countButton');
const resetButton = document.getElementById('resetButton');

counter.textContent = count;

countButton.addEventListener('click', () => {
  count++;
  counter.textContent = count;
  localStorage.setItem('count', count);

  if (isSoundOn && count % 33 === 0) {
    playSound();
  }
});

resetButton.addEventListener('click', () => {
  count = 0;
  counter.textContent = count;
  localStorage.setItem('count', count);
});

function playSound() {
  const audio = new Audio('zvuk.mp3');
  audio.play();
}
