let darkModeState = false;
const button = document.querySelector(".btn");
const useDark = window.matchMedia("(prefers-color-scheme: dark)");
const themeColorMeta = document.getElementById("theme-color");

function toggleDarkMode(state) {
  document.documentElement.classList.toggle("dark-mode", state);
  darkModeState = state;

  
  if (state) {
    themeColorMeta.setAttribute("content", "#000000"); 
  } else {
    themeColorMeta.setAttribute("content", "#ffffff"); 
  }
}

function setDarkModeLocalStorage(state) {
  localStorage.setItem("dark-mode", state);
}

const savedDarkModeState = localStorage.getItem("dark-mode") === "true";
toggleDarkMode(savedDarkModeState);

useDark.addEventListener("change", (evt) => toggleDarkMode(evt.matches));

button.addEventListener("click", () => {
  darkModeState = !darkModeState;
  toggleDarkMode(darkModeState);
  setDarkModeLocalStorage(darkModeState);
});