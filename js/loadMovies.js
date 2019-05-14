function handler(url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = function(e) {
            resolve(e.target.response);
        };
        xhr.onerror = function() {
            reject(new Error("Can't connect to the movie list!"));
        };
        xhr.send();
    });
}
var pageNum = 1;
var urlMovies = "https://api.themoviedb.org/3/movie/popular?api_key=4bef8838c2fd078bd13d7127d8dedcd4&language=en-US&page=";

handler(urlMovies + pageNum).then(function(response) {
    document.querySelector(".pagination p").textContent = "Page " + pageNum + " / Total 992 of 19837 results";
    addMovie(JSON.parse(response));
}).catch(function() {
    console.error();
});
// screen movies
function addMovie(data) {
    // var cnt = Object.keys(blockStack).length;

    data.results.forEach(result => {
        var imgSrc = "https://image.tmdb.org/t/p/w500" + result.poster_path;
        var imgReplaceSrc = "this.src='" + "https://image.tmdb.org/t/p/w500" + result.backdrop_path + "'";
        var imgId = result.id;
        var releaseDate = moment(result.release_date).format("MMM DD, YYYY");
        var movieToAdd =
            `
            <div class="movie">
                <div class="movie-operation">
                    <img class="like-icon" src="asset/not-liked.png">
                    <img class="block-icon" src="asset/not-disliked.png">
                </div>
                <img class='movie-post' id=${imgId} src=${imgSrc} onerror=${imgReplaceSrc}>
                <h3 class='movie-title'>${result.title}</h3>
                <p class='movie-date'>${releaseDate}</p>
            </div>
            `;
        document.querySelector(".movie-list-content").innerHTML += movieToAdd;
    });
}