const searchinF = document.getElementById('s-input');
const searchbtn = document.getElementById('s-btn');
let movies = [];

searchbtn.addEventListener('click', SM);
searchinF.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        SM();
    }
});

function fetchMovies() {
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTQ4MDhhMTQ2ODBhZDdhODgyYjA0M2IxOTQ2YzdkMyIsInN1YiI6IjY1OTU0MWFjMzI2ZWMxNjZiMjA2YzIyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.66NA-W0dWhkCntF7TiW5rlXkJZCjuLHdT4D0LqIoTmY',
            'Accept': 'application/json'
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            movies = data.results;
            renderMovies(movies);
        })
        .catch((error) => console.error('데이터를 가져오는 중 오류 발생:', error));
}

// 초기 페이지 로딩 시 영화 목록을 가져옴
fetchMovies();

function SM() {
    const ST = searchinF.value.toLowerCase();
    const filteredM = movies.filter((movie) => movie.title.toLowerCase().includes(ST));
    renderMovies(filteredM);
}

function renderMovies(movies) {
    const moviesContainer = document.getElementById('movies-main');
    moviesContainer.innerHTML = '';

    movies.forEach((movie) => {
        const movieCard = createMovieCard(movie);
        moviesContainer.appendChild(movieCard);
    });
}

function createMovieCard(movie) {
    const { id, title, overview, poster_path, vote_average } = movie;

    const card = document.createElement('div');
    const image = document.createElement('img');
    const titleElement = document.createElement('h2');
    const overviewElement = document.createElement('p');
    const voteAverageElement = document.createElement('p');

    card.className = 'movie-card';
    image.className = 'poster-image';
    titleElement.className = 'title';
    overviewElement.className = 'overview';
    voteAverageElement.className = 'vote-average';

    image.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
    titleElement.textContent = title;
    overviewElement.textContent = overview;
    voteAverageElement.textContent = `평점: ${vote_average}`;

    card.setAttribute('id', id);

    card.appendChild(image);
    card.appendChild(titleElement);
    card.appendChild(overviewElement);
    card.appendChild(voteAverageElement);

    card.addEventListener('click', () => {
        alert(`이 영화의 ID는 ${id}입니다`);
    });

    return card;
}
