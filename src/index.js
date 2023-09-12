import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
const refs = {
  selectEl: document.querySelector('.js-choice'),
  divCatInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

refs.loader.style.display = 'none';
refs.error.style.display = 'none';

function loadCatsInfo() {
  refs.loader.style.display = 'block';
  refs.selectEl.style.display = 'none';
  refs.divCatInfo.style.display = 'none';
}

function upLoaded() {
  refs.loader.style.display = 'none';
  refs.divCatInfo.style.display = 'block';
}

fetchBreeds()
  .then(cats => {
    const markUp = cats
      .map(el => `<option value=${el.id}>${el.name}</option>`)
      .join('');
    refs.selectEl.innerHTML = markUp;
    new SlimSelect({
      select: refs.selectEl,
    });

    return cats;
  })
  .catch(error => {
    refs.loader.style.display = 'none';
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
  });

refs.selectEl.addEventListener('change', onSelectElChange);

function onSelectElChange(event) {
  loadCatsInfo();
  const value = event.target.value;
  fetchCatByBreed(value)
    .then(renderCats)
    .catch(error => {
      refs.loader.style.display = 'none';
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
  refs.divCatInfo.innerHTML = '';
}

function renderCats(catsInfo) {
  upLoaded();
  const name = catsInfo[0].breeds[0].name;
  const img = catsInfo[0].url;
  const discription = catsInfo[0].breeds[0].description;
  const temperament = catsInfo[0].breeds[0].temperament;
  const markUp = `<img src="${img}"/> <h2 class=cats-name>${name}</h2> ${discription}, <h3>Temperament</h3>${temperament}`;
  refs.divCatInfo.innerHTML = markUp;
}
