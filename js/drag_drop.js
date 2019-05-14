/*
 *src obj event：ondragstart/ondrag/ondragend
 *tar obj event：ondragenter/ondragover/ondragleave/ondrop
 */
var configList = document.querySelector(".config-list");
var dragged;
var draggedMovie;

configList.addEventListener('dragstart', function(e) {
    dragged = e.target;
    dragged.classList.add('draging');
    draggedMovie = document.getElementById("liked-" + e.target.id.substring(13));
})

configList.addEventListener('dragover', function(e) {
    e.preventDefault();
})

configList.addEventListener('drop', function(e) {
    dragged.classList.remove('draging');
    if (e.target.nodeName === 'LI') {
        var dropPlace = document.getElementById("liked-" + e.target.id.substring(13));
        if (dragged.nextSibling == e.target) {
            e.target.parentNode.insertBefore(e.target, dragged);
            draggedMovie.parentNode.insertBefore(dropPlace, draggedMovie);
        } else {
            e.target.parentNode.insertBefore(dragged, e.target);
            draggedMovie.parentNode.insertBefore(draggedMovie, dropPlace);
        }
    }
})