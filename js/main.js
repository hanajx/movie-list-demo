// 1. like listener
var cntLikedTotal = 0;
document.querySelector('.main-list').addEventListener('click', likeMovie, { capture: true });

function likeMovie(event) {
    if (event.target.className === "like-icon") {
        let currLikeIcon = event.target;
        // if this movie has been in the liked list, don't add it
        if (currLikeIcon.src.match("asset/liked.png")) {
            // don't add
            // return;
            // delete from liked list
            removeFromLiked(currLikeIcon);
        } else {
            // will only consider movie list and blocked list
            if (currLikeIcon.parentElement.parentElement.parentElement.className === "blocked-list-content") {
                removeFromBlocked(currLikeIcon);
            }
            addToLiked(currLikeIcon);
        }
    }
}

function addToLiked(currLikeIcon) {
    currLikeIcon.setAttribute("src", "asset/liked.png");
    let eleToAdd = currLikeIcon.parentElement.parentElement.cloneNode(true);
    eleToAdd.setAttribute("draggable", "true");
    document.querySelector(".liked-list-content").appendChild(eleToAdd);
    ++cntLikedTotal;
    eleToAdd.setAttribute("id", "liked-" + cntLikedTotal);

    let likedTitle = document.querySelector("#liked-" + cntLikedTotal).textContent;
    let configId = "liked-config-" + cntLikedTotal;
    let newConfig = `<li class="drag" id=${configId} draggable="true">${likedTitle}</li>`
    document.querySelector(".config-list").innerHTML += newConfig;

    let cntLiked = parseInt(document.getElementById("liked-num").textContent);
    ++cntLiked;
    document.getElementById("liked-num").textContent = cntLiked;
    if (cntLiked === 1) {
        document.getElementById("liked").style.display = "block";
        document.getElementById('liked-num').style.display = "block";
    }
}

function removeFromBlocked(currLikeIcon) {
    currLikeIcon.parentElement.children[1].setAttribute("src", "asset/not-disliked.png");

    let eleToDel = currLikeIcon.parentElement.parentElement;
    document.querySelector(".movie-list-content").appendChild(eleToDel);
    // delete(blockStack[eleToDel.id]);

    let cntBlocked = parseInt(document.getElementById("blocked-num").textContent);
    --cntBlocked;
    document.getElementById("blocked-num").textContent = cntBlocked;
    if (cntBlocked === 0) {
        document.getElementById("blocked").style.display = "none";
        document.getElementById('blocked-num').style.display = "none";
    }
}

// 2. block listener
// var blockStack = {};
document.querySelector(".main-list").addEventListener('click', blockMovie, { capture: true });

function blockMovie(event) {
    if (event.target.className === "block-icon") {
        let currBlockIcon = event.target;
        // if this movie has been inside the blocked list
        if (currBlockIcon.src.match("asset/disliked.png")) { // in blocked
            // don't add
            // return;
            // remove from blocked list
            removeFromBlocked(currBlockIcon);
        } else { // not in blocked
            // will only consider liked list and movie list
            if (currBlockIcon.parentElement.children[0].src.match("asset/liked.png")) {
                removeFromLiked(currBlockIcon);
            }
            addToBlocked(currBlockIcon);
        }
    }
}

function addToBlocked(currBlockIcon) {
    let titleToAdd = currBlockIcon.parentElement.parentElement.children[2].textContent;
    let movieList = document.querySelectorAll(".movie-list-content .movie");
    movieList.forEach(ele => {
        if (ele.children[2].textContent === titleToAdd) {
            ele.children[0].children[0].setAttribute("src", "asset/not-liked.png");
            ele.children[0].children[1].setAttribute("src", "asset/disliked.png");
            document.querySelector(".blocked-list-content").appendChild(ele);
            // blockStack[ele.id] = ele;
        }
    });

    let cntBlocked = parseInt(document.getElementById("blocked-num").textContent);
    ++cntBlocked;
    document.getElementById("blocked-num").textContent = cntBlocked;
    if (cntBlocked === 1) {
        document.getElementById("blocked").style.display = "block";
        document.getElementById('blocked-num').style.display = "block";
    }
}

function removeFromLiked(currBlockIcon) {
    currBlockIcon.setAttribute("src", "asset/not-liked.png");
    let titleToDel = currBlockIcon.parentElement.parentElement.children[2].textContent;
    let likedList = document.querySelectorAll(".liked-list-content .movie");
    likedList.forEach(ele => {
        if (ele.children[2].textContent === titleToDel) {
            var configToDel = document.getElementById("liked-config-" + ele.id.substring(6));
            document.querySelector(".config-list").removeChild(configToDel);
            document.querySelector(".liked-list-content").removeChild(ele);
        }
    });

    let cntLiked = parseInt(document.getElementById('liked-num').textContent);
    --cntLiked;
    document.getElementById('liked-num').textContent = cntLiked;
    if (cntLiked === 0) {
        document.getElementById("liked").style.display = "none";
        document.getElementById('liked-num').style.display = "none";
    }
}