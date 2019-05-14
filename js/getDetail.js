var urlDetail = "https://api.themoviedb.org/3/movie/299537?api_key=4bef8838c2fd078bd13d7127d8dedcd4&language=en-US";
// get info of clicked post of the movie
document.querySelector(".main-list").addEventListener('click', getDetail, { capture: true });

function getDetail(e) {
    if (e.target.className === "movie-post") {
        urlDetail = "https://api.themoviedb.org/3/movie/" + e.target.id + "?api_key=4bef8838c2fd078bd13d7127d8dedcd4&language=en-US";
        // promise to get connect to detail list
        handler(urlDetail).then(function(response) {
            document.querySelector(".detail").style.display = "block";
            $(".detail-layer").ready(function() {
                $("#detail-loading").fadeOut("slow");
            });
            screenDetail(JSON.parse(response));
        }).catch(function() {
            console.error();
        });
    }
}

function screenDetail(detail) {
    var titleAndYear = detail["original_title"] + " (" + detail["release_date"].substring(0, 4) + ")";
    var genres = detail["genres"];
    var overview = detail["overview"];
    var companies = detail["production_companies"];
    var posterUrl = "https://image.tmdb.org/t/p/w500" + detail["poster_path"];
    var backgroundUrl = "https://image.tmdb.org/t/p/w500" + detail["backdrop_path"];

    document.getElementById("detail-post").src = posterUrl;
    document.querySelector(".detail-content").style.backgroundImage = "url(" + backgroundUrl + ")";
    document.querySelector("#detail-title").innerHTML = `<p>${titleAndYear}</p>`;
    var genresEle = ``;
    genres.forEach(gen => {
        var name = gen["name"];
        genresEle += `<p style="background:${genresColor[name]};">${name}</p>`;
    });
    document.getElementById("detail-genres").innerHTML = genresEle;
    document.getElementById("detail-overview").textContent = overview;
    var companyEle = ``;
    console.log(companies);
    companies.forEach(company => {
        if (company["logo_path"] != null) {
            var logoUrl = "https://image.tmdb.org/t/p/w500" + company["logo_path"];
            companyEle += `<img src=${logoUrl}>`;
        }
    });
    document.getElementById("detail-companies").innerHTML = companyEle;
}
document.getElementById("close-icon-2").addEventListener('click', function() {
    document.querySelector(".detail").style.display = "none";
});

var genresColor = {
    "Action": "orange",
    "Adventure": "Gold",
    "Animation": "aqua",
    "Comedy": "tomato",
    "Crime": "LightCoral",
    "Documentary": "blue",
    "Drama": "Maroon",
    "Family": "green",
    "History": "Olive",
    "Horror": "Black",
    "Music": "violet",
    "Mystery": "grey",
    "Romance": "pink",
    "Science Fiction": "Navy",
    "TV Movie": "Silver",
    "Thriller": "Brown",
    "War": "Teal",
    "Western": "sandybrown"
}