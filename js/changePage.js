document.querySelector(".pagination").addEventListener('click', function(e) {
    if (e.target.id === "prev") {
        if (pageNum === 1) {
            return;
        }
        --pageNum;
        if (pageNum === 1) {
            document.getElementById("prev").setAttribute("disabled", true);
        }
    } else if (e.target.id === "next") {
        ++pageNum;
        if (pageNum > 1) {
            document.getElementById("prev").removeAttribute("disabled");
        }
    }
    document.querySelector(".movie-list-content").innerHTML = null;
    handler(urlMovies + pageNum).then(function(response) {
        document.querySelector(".pagination p").textContent = "Page " + pageNum + " / Total 992 of 19837 results";
        addMovie(JSON.parse(response));
    }).catch(function(e) {
        console.error();
    });
});