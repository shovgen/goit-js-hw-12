// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";


const gallery = document.querySelector('.gallery');

const loader = document.querySelector('.loader');
const loadMore = document.querySelector('.load-more');


const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});


export function createGallery(images) {
    const markup = images.map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${likes}</p>
        <p><b>Views:</b> ${views}</p>
        <p><b>Comments:</b> ${comments}</p>
        <p><b>Downloads:</b> ${downloads}</p>
      </div>
    </li>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallerry() {
    gallery.innerHTML = '';
}

export function showLoad() {
    loader.classList.remove('hidden');
}
export function hiddenLoad() {
    loader.classList.add('hidden');
}

export function showMoreLoad() {
  loadMore.classList.remove('hidden');
}
export function hiddenMoreLoad() {
  loadMore.classList.add('hidden');
}
