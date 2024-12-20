const global = {
  currentPage: window.location.pathname,
};

//Display popular movies
async function displayPopularMovies() {
  const { results } = await fetchAPIData("movie/popular");

  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
       <a href="movie-details.html?id=${movie.id}">
       ${
         movie.poster_path
           ? `<img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        class="card-img-top"
        alt="${movie.title}"
      />`
           : `<img
      src="../images/no-image.jpg"
      class="card-img-top"
      alt="${movie.title}"
    />`
       }
         
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release:${movie.release_date}</small>
            </p>
          </div>
    `;

    document.querySelector('#popular-movies').appendChild(div);
  });
}

async function fetchAPIData(endpoint) {
  const API_KEY = "8166ec3161dce091c9749aec7240c88f";
  const API_URL = "https://api.themoviedb.org/3/";

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();

  return data;
}

//highlight the active link
function highlightActiveLink() {
  const links = document.querySelectorAll(".nav-link");

  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}

//init app
function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displayPopularMovies();
      break;
    case "/shows":
      console.log("Shows");
      break;
    case "/movie-details":
      console.log("Movie Details");
      break;
    case "/tv-details":
      console.log("TV Details");
      break;
    case "/search.html":
      console.log("Search");
      break;
  }

  highlightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);