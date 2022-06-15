let settingsModal = document.getElementById("settingsModal");
let modalSettingsButton = document.getElementById("settings");
let modalClose = document.getElementsByClassName("modal-close")[0];

modalSettingsButton.onclick = function() {
    settingsModal.style.display = "block";
}

modalClose.onclick = function() {
    settingsModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === settingsModal) {
        settingsModal.style.display = "none";
    }
}