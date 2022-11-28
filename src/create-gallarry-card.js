export default function createGalleryCard(objCart, refs, btnLoadMore) {
  if (!objCart.hits) {
    refs.divGallery.insertAdjacentHTML(
      'beforeend',
      "<p class = 'info-massage'>We're sorry, but you've reached the end of search results.</p>"
    );
    btnLoadMore.hide();
  } else {
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
}
