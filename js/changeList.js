// 1. page switching
document.getElementById("config").addEventListener('click', function() {
    document.querySelector(".movie-page").style.display = "none";
    document.querySelector(".config-page").style.display = "block";
});
document.getElementById("close-icon-1").addEventListener('click', function() {
    document.querySelector(".movie-page").style.display = "block";
    document.querySelector(".config-page").style.display = "none";
});
// 2. page content rotating
document.getElementById("popular").addEventListener('click', function() {
    // document.querySelector(".block-page").style.display = "none";
    document.getElementById("config").style.display = "none";
    document.querySelector(".main-list").style.transform = "rotateY(0deg)";
    document.getElementById("popular").style.borderBottom = "0.2vw solid coral";
    document.getElementById("popular").style.fontSize = "1.5vw";
    document.getElementById("liked").style.fontSize = "1.2vw";
    document.getElementById("liked").style.borderStyle = "none";
    document.getElementById("blocked").style.fontSize = "1.2vw";
    document.getElementById("blocked").style.borderStyle = "none";
});
document.getElementById("liked").addEventListener('click', function() {
    document.getElementById("config").style.display = "block";
    document.querySelector(".main-list").style.transform = "rotateY(90deg)";
    document.getElementById("liked").style.borderBottom = "0.2vw solid coral";
    document.getElementById("liked").style.fontSize = "1.5vw";
    document.getElementById("popular").style.fontSize = "1.2vw";
    document.getElementById("popular").style.borderStyle = "none";
    document.getElementById("blocked").style.fontSize = "1.2vw";
    document.getElementById("blocked").style.borderStyle = "none";
});
document.getElementById("blocked").addEventListener('click', function() {
    document.getElementById("config").style.display = "none";
    document.querySelector(".main-list").style.transform = "rotateY(180deg)";
    document.getElementById("blocked").style.borderBottom = "0.2vw solid coral";
    document.getElementById("blocked").style.fontSize = "1.5vw";
    document.getElementById("liked").style.fontSize = "1.2vw";
    document.getElementById("liked").style.borderStyle = "none";
    document.getElementById("popular").style.fontSize = "1.2vw";
    document.getElementById("popular").style.borderStyle = "none";
});