let darkModeState = false;
const button = document.querySelector(".btn");
const useDark = window.matchMedia("(prefers-color-scheme: dark)");
const themeColorMeta = document.getElementById("theme-color");

// Функция для переключения темной темы
function toggleDarkMode(state) {
  document.documentElement.classList.toggle("dark-mode", state);
  darkModeState = state;

  // Обновление цвета темы
  if (state) {
    themeColorMeta.setAttribute("content", "#000000"); // Темная тема
  } else {
    themeColorMeta.setAttribute("content", "#ffffff"); // Светлая тема
  }
}

// Функция для сохранения состояния в локальное хранилище
function setDarkModeLocalStorage(state) {
  localStorage.setItem("dark-mode", state);
}

// Установка начального состояния темной темы из локального хранилища
const savedDarkModeState = localStorage.getItem("dark-mode") === "true";
toggleDarkMode(savedDarkModeState);

// Обработчик изменения предпочтений системы
useDark.addEventListener("change", (evt) => toggleDarkMode(evt.matches));

// Обработчик клика по кнопке
button.addEventListener("click", () => {
  darkModeState = !darkModeState;
  toggleDarkMode(darkModeState);
  setDarkModeLocalStorage(darkModeState);
});
