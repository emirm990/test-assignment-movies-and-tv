let apiKey = "fdcceaee503d65d10f646f384fbc9aec";

let moviesButton = document.getElementById("movies-button");
let tvButton = document.getElementById("tv-button");
let search = document.getElementById("search");
let title = document.getElementById("title");
let screen = document.getElementById("screen");
let movies = document.getElementById("movies");
let moviesButtonClicked = false;
let tvButtonClicked = true;
let modal = document.getElementById('myModal');
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];
let modalContent = document.getElementById("modal-content");
let documentTitle = document.getElementById("title");

async function getData(tvOrMovie){
    let response = await fetch("https://api.themoviedb.org/3/" + tvOrMovie + "/top_rated?api_key="+apiKey+"&language=en-US&page=1");
    let json = await response.json();
    if (tvButtonClicked){
        for (let i=0;i<10;i++){
            movies.innerHTML += 
                `<div id=${json.results[i].id} class="card col-6 col-sm-6 col-md-4 col-lg-3 mb-3">
                    <img class="card-img-top" src="http://image.tmdb.org/t/p/w400//${json.results[i].poster_path}">
                    <h5 class="card-title text-center mt-3" id="${i}">${json.results[i].name}</h5>
                </div>`
        }
    }else{
        for (let i=0;i<10;i++){
            movies.innerHTML += 
                `<div id=${json.results[i].id} class="card col-6 col-sm-6 col-md-4 col-lg-3 mb-3">
                    <img class="card-img-top" src="http://image.tmdb.org/t/p/w400//${json.results[i].poster_path}">
                    <h5 class="card-title text-center mt-3" id="${i}">${json.results[i].title}</h5>
                </div>`
        }
    }
}
async function getSearch(searchInput){
    if (tvButtonClicked){
        tvOrMovie = "tv";
    }else tvOrMovie = "movie";
    let response = await fetch("https://api.themoviedb.org/3/search/" + tvOrMovie + "?api_key=fdcceaee503d65d10f646f384fbc9aec&language=en-US&query=" + searchInput + "&page=1&include_adult=false");
    let json = await response.json();

    if (tvButtonClicked){
        for (let i=0;i<10;i++){
            movies.innerHTML += 
                `<div id=${json.results[i].id} class="card col-6 col-sm-6 col-md-4 col-lg-3 mb-3">
                    <img class="card-img-top" src="http://image.tmdb.org/t/p/w400//${json.results[i].poster_path}">
                    <h5 class="card-title text-center mt-3" id="${i}">${json.results[i].name}</h5>
                </div>`
        }
    }else{
        for (let i=0;i<10;i++){
            movies.innerHTML += 
                `<div id=${json.results[i].id} class="card col-6 col-sm-6 col-md-4 col-lg-3 mb-3">
                    <img class="card-img-top" src="http://image.tmdb.org/t/p/w400//${json.results[i].poster_path}">
                    <h5 class="card-title text-center mt-3" id="${i}">${json.results[i].title}</h5>
                </div>`
        }
    }
    
}

async function getById(id, type){
    let response;
    let json;
    if (tvButtonClicked){
        response = await fetch("https://api.themoviedb.org/3/tv/" + id + "?api_key=" + apiKey + "&language=en-US");
        json = await response.json();
        modalContent.innerHTML = 
        `<img class="card-img-top img-fluid" src="http://image.tmdb.org/t/p/w400/${json.poster_path}">
        <h4 class="card-title text-center mt-3">${json.name}</h4>
        <p class="card-text px-3 pb-2">${json.overview}</p>`
    }else {
        response = await fetch("https://api.themoviedb.org/3/movie/" + id + "?api_key=" + apiKey + "&language=en-US");
        json = await response.json();
        modalContent.innerHTML = 
        `<img class="card-img-top img-fluid" src="http://image.tmdb.org/t/p/w400/${json.poster_path}">
        <h4 class="card-title text-center mt-3">${json.title}</h4>
        <p class="card-text px-3 pb-2">${json.overview}</p>`
    }
}

search.addEventListener("input", function(){
    movies.innerHTML = "";
    if (search.value.length > 2){
        getSearch(search.value);
    }else if(moviesButtonClicked){
        getData("movie"); 
    }else{
        getData("tv");
    }
    
})

moviesButton.addEventListener("click", function(){
    tvButton.classList.remove("btn-primary");
    moviesButton.classList.add("btn-primary");
    moviesButtonClicked = true;
    tvButtonClicked = false;
    tvOrMovie = "movie";
    movies.innerHTML = "";
    documentTitle.innerHTML = "Movies";
    getData("movie"); 
});

tvButton.addEventListener("click", function(){
    tvButton.classList.add("btn-primary");
    moviesButton.classList.remove("btn-primary");
    moviesButtonClicked = false;
    tvButtonClicked = true;
    movies.innerHTML = "";
    documentTitle.innerHTML = "TV";
    getData("tv");
})

movies.addEventListener("click", function(event){
    modal.style.display = "block";
    let id = event.target.parentElement.id;
    getById(id);
})
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
getData("tv");