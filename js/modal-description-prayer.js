var modals = document.getElementsByClassName("modal");
var btns = document.getElementsByClassName("openModal");
var spans = document.getElementsByClassName("close");

for (let i = 0; i < btns.length; i++) {
    btns[i].onclick = function() {
        var modalId = this.getAttribute("data-modal");
        document.getElementById(modalId).style.display = "block";
    }
}


for (let i = 0; i < spans.length; i++) {
    spans[i].onclick = function() {
        this.parentElement.parentElement.style.display = "none";
    }
}


window.onclick = function(event) {
    for (let i = 0; i < modals.length; i++) {
        if (event.target == modals[i]) {
            modals[i].style.display = "none";
        }
    }
}
