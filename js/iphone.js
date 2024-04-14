if (!localStorage.getItem('appInstalled') && !window.matchMedia('(display-mode: standalone)').matches && /iPhone|iPod/i.test(navigator.userAgent)) {
    // Открываем модальное окно только на устройствах iPhone
    document.getElementById('myModal').style.display = "block";
    localStorage.setItem('appInstalled', 'true');
}

// Закрытие модального окна при нажатии на кнопку "Close"
document.getElementsByClassName("close")[0].onclick = function () {
    document.getElementById('myModal').style.display = "none";
}