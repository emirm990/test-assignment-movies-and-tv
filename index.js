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

function mainContent(id, poster, name){
    return movies.innerHTML += 
    `<div id=${id} class="card col-6 col-sm-6 col-md-4 col-lg-3 mb-3">
        <img class="card-img-top" src="http://image.tmdb.org/t/p/w400//${poster}">
        <h5 class="card-title text-center mt-3">${name}</h5>
    </div>`
}
function detailsContent(poster, name, overview){
    return modalContent.innerHTML = 
        `<img class="card-img-top img-fluid" src="http://image.tmdb.org/t/p/w400/${poster}">
        <h4 class="card-title text-center mt-3">${name}</h4>
        <p class="card-text px-3 pb-2">${overview}</p>`
}
function detailsContentTrailer(trailer, name, overview){
    let video = document.getElementById("video");
    return modalContent.innerHTML = 
        `<div class="videoWrapper">
            <iframe id="video" width="560" height="315" src="https://www.youtube.com/embed/${trailer}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>    
        </div>
        <h4 class="card-title text-center mt-3">${name}</h4>
        <p class="card-text px-3 pb-2">${overview}</p>`
}
async function getData(tvOrMovie){
    let response = await fetch("https://api.themoviedb.org/3/" + tvOrMovie + "/top_rated?api_key="+apiKey+"&language=en-US&page=1");
    let json = await response.json();
    
    if (tvButtonClicked){
        for (let i=0;i<10;i++){
            mainContent(json.results[i].id, json.results[i].poster_path, json.results[i].name);
        }
    }else{
        for (let i=0;i<10;i++){
            mainContent(json.results[i].id, json.results[i].poster_path, json.results[i].title);
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
            mainContent(json.results[i].id,json.results[i].poster_path,json.results[i].name);
        }
    }else{
        for (let i=0;i<10;i++){
            mainContent(json.results[i].id,json.results[i].poster_path,json.results[i].title);
        }
    }
    
}

async function getById(id){
    let response;
    let json;
    let responseVideo;
    let videoJson;
    
    if (tvButtonClicked){
        response = await fetch("https://api.themoviedb.org/3/tv/" + id + "?api_key=" + apiKey + "&language=en-US");
        json = await response.json();
        responseVideo = await fetch("https://api.themoviedb.org/3/tv/" + id + "/videos?api_key=" + apiKey + "&language=en-US");
        videoJson = await responseVideo.json();
        if (videoJson.results != 0){
            
            for (index in videoJson.results){
                console.log(videoJson.results);
                if(videoJson.results[index].type == "Trailer"){
                    detailsContentTrailer(videoJson.results[0].key, json.name, json.overview);
                    break;
                } else detailsContent(json.poster_path, json.name, json.overview);
            }
        }else detailsContent(json.poster_path, json.name, json.overview);   
    }else{
        response = await fetch("https://api.themoviedb.org/3/movie/" + id + "?api_key=" + apiKey + "&language=en-US");
        json = await response.json();
        responseVideo = await fetch("https://api.themoviedb.org/3/movie/" + id + "/videos?api_key=" + apiKey + "&language=en-US");
        videoJson = await responseVideo.json();
        if (videoJson.results != 0){
            for (index in videoJson.results){
                if(videoJson.results[index].type == "Trailer"){
                    detailsContentTrailer(videoJson.results[0].key, json.title, json.overview);
                    break;
                } //else detailsContent(json.poster_path, json.title, json.overview);
            }
        }else detailsContent(json.poster_path, json.title, json.overview);   
        //detailsContent(json.poster_path, json.title, json.overview);
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
    search.value = '';
    getData("movie"); 
});
tvButton.addEventListener("click", function(){
    tvButton.classList.add("btn-primary");
    moviesButton.classList.remove("btn-primary");
    moviesButtonClicked = false;
    tvButtonClicked = true;
    movies.innerHTML = "";
    documentTitle.innerHTML = "TV";
    search.value = '';
    getData("tv");
})
movies.addEventListener("click", function(event){
    modal.style.display = "block";
    let id = event.target.parentElement.id;
    console.log(id);
    getById(id);
})
span.onclick = function() {
    modal.style.display = "none";
    try {
        video.src = video.src;
    }
    catch(err){
        console.log(err);
    }
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    try{
        video.src = video.src;
    }
    catch(err){
        console.log(err);
    }
  }
}
getData("tv");