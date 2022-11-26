import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ImagesApiServer from './api-server';
import BtnLoadMore from './load-more';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('#search-form'),
  divGallery: document.querySelector('.gallery'),
};

const imagesApiServer = new ImagesApiServer();
const btnLoadMore = new BtnLoadMore({
  classBtn: '.load-more',
  hidden: true,
});

refs.form.addEventListener('submit', onForm);
btnLoadMore.refs.btnLoadMore.addEventListener('click', onLoadMore);

function onForm(event) {
  event.preventDefault();
  resetGallery();
  btnLoadMore.hide();

  imagesApiServer.query = event.currentTarget.elements.searchQuery.value;

  imagesApiServer.resetPage();
  imagesApiServer
    .fetchRequest()
    .then(images => {
      if (!images.hits.length) {
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      renderGalleryCard(createGalleryCard(images));
      lightbox.refresh();
      btnLoadMore.show();
      Notify.info(`Hooray! We found ${images.totalHits} images.`);
    })
    .catch(error => {
      console.log('error');
    });
}

function onLoadMore() {
  imagesApiServer.fetchRequest().then(images => {
    renderGalleryCard(createGalleryCard(images));
    lightbox.refresh();
  });
}

function createGalleryCard(objCart) {
  if (!objCart.hits) {
    btnLoadMore.hide();
    refs.divGallery.insertAdjacentHTML(
      'beforeend',
      "<p class = 'info-massage'>We're sorry, but you've reached the end of search results.</p>"
    );
  }
  return objCart.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
      <a href="${largeImageURL}"><img width=340 height=226 src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
  
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>`;
      }
    )
    .join('');
}

function renderGalleryCard(gallery) {
  refs.divGallery.insertAdjacentHTML('beforeend', gallery);
}

function resetGallery() {
  refs.divGallery.innerHTML = '';
}
const lightbox = new SimpleLightbox('.gallery a');
