const addMovieModal = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancleAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = addMovieModal.querySelector('.btn--success');
const userInputs = document.querySelectorAll('input');
const textSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const updateUI = () => {
  if (movies.length === 0) {
    textSection.style.display = 'block';
  } else {
    textSection.style.display = 'none';
  }
};

const closeMovieDeletionModal = () => {
  toggleBackdrop();
  deleteMovieModal.classList.remove('visible');
};

const deleteMovieHandler = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const listRoot = document.getElementById('movie-list');
  listRoot.children[movieIndex].remove();
  closeMovieDeletionModal();
  updateUI();
};

const startDeleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add('visible');
  toggleBackdrop();
  const cancleDeletionButton = deleteMovieModal.querySelector('.btn--passive');
  let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

  confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));

  confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

  cancleDeletionButton.removeEventListener('click', closeMovieDeletionModal);

  cancleDeletionButton.addEventListener('click', closeMovieDeletionModal);
  confirmDeletionButton.addEventListener(
    'click',
    deleteMovieHandler.bind(null, movieId)
  );
};

// U ovoj funkciji vjezbamo kako dodati elemente u <ul/> pomocu innerHTML
const renderNewMovie = (id, title, imageUrl, rating) => {
  const newMovie = document.createElement('li'); // Ovdje stvaramo <li/> listu
  newMovie.className = 'movie-element';
  newMovie.innerHTML = `
  <div class="movie-element__image">
  <img src="${imageUrl}" alt="${title}">
  </div>
  <div class="movie-element__info">
  <h2>${title}</h2>
  <p>${rating}/5⭐</p>
  </div>
  `;

  newMovie.addEventListener('click', startDeleteMovieHandler.bind(null, id));
  const listRoot = document.getElementById('movie-list');
  listRoot.append(newMovie); // Dodajemo novi film u nasu listu filmova
};

const closeMovieModal = () => {
  addMovieModal.classList.remove('visible');
};

const showMovieModal = () => {
  addMovieModal.classList.add('visible');
  toggleBackdrop();
};

const backdropClickHandler = () => {
  closeMovieModal();
  closeMovieDeletionModal();
  // claerMovieInputs(); ==> Ako zelimo da se input vrijednosti vrate na nulu onda i kada stisnemo van modala
};

const cancleAddMovieHandler = () => {
  closeMovieModal();
  claerMovieInputs();
  toggleBackdrop();
};

const claerMovieInputs = () => {
  for (const inputValue of userInputs) {
    inputValue.value = '';
  }
};

const confirmAddMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;
  const regex = /^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/\S*)?$/;
  const enterUrl = document.getElementById('urlInput').value;

  if (
    titleValue.trim() === '' ||
    imageValue.trim() === '' ||
    ratingValue.trim() === '' ||
    +ratingValue < 1 ||
    +ratingValue > 5 ||
    !regex.test(enterUrl)
  ) {
    alert('Please enter valid values (Numbers between 1...5) and a valid URL');
    return;
  }

  // Kreiranje objekta filma sa unesenim podacima
  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageValue,
    rating: ratingValue,
  };

  movies.push(newMovie); // Dodavanje novog filma u listu
  console.log(movies);
  toggleBackdrop();
  closeMovieModal();
  claerMovieInputs();
  renderNewMovie(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
  updateUI();

  /*  Vracanje userInputs vrijednosti na 0, na drugi nacin

  userInputs[0].value = '';
  userInputs[1].value = '';
  userInputs[2].value = null;
  document.getElementById('urlInput').value = '';
  */
};

startAddMovieButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancleAddMovieButton.addEventListener('click', cancleAddMovieHandler);
confirmAddMovieButton.addEventListener('click', confirmAddMovieHandler);
