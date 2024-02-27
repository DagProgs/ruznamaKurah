
document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById("popup");
    const closeBtn = document.getElementById("closeBtn");
  
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // 0 - Sunday, 1 - Monday, ..., 6 - Saturday
  
    // Проверка для сброса информации о показе подсказки в начале каждой недели (воскресенье)
    if (currentDay === 0) {
        localStorage.removeItem("popupShown");
    }
  
    if (currentDay === 5) { // Пятница (5 - Friday)
        if (localStorage.getItem("popupShown") !== "true") {
            popup.style.display = "block";
            localStorage.setItem("popupShown", "true");
        }
    } else {
        localStorage.removeItem("popupShown"); // Сброс информации о показе в другие дни недели
    }
  
    closeBtn.addEventListener("click", function() {
        popup.style.display = "none";
    });
  });
