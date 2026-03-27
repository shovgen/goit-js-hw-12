
import { getImagesByQuery } from './js/pixabay-api';
import { createGallery, clearGallerry, showLoad, hiddenLoad ,showMoreLoad, hiddenMoreLoad, } from './js/render-functions';

import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

const loadMore = document.querySelector('.load-more');


let currentQuery = '';
let currentPage = 1;
let totalHits = 0;


form.addEventListener('submit',async (e) => {
    e.preventDefault();
 
    currentQuery = e.currentTarget.elements['search-text'].value.trim();
    if (!currentQuery) {
        iziToast.warning({
            title: 'Warning',
            message: 'Please enter a search text!',
        });
        return
    }
    currentPage = 1;
    clearGallerry();
    hiddenMoreLoad() 
    showLoad();

    try {
        const data = await
            getImagesByQuery(currentQuery, currentPage);
        totalHits = data.totalHits;
        
        if (data.hits.length === 0) {
            iziToast.error({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
            });
        } else {
            createGallery(data.hits);
            checkLoadMoreStatus();
        }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Somsing wrong, please try again.',
        });
        console.log(error);

    } finally {
        hiddenLoad();
          e.target.reset();
    }

  
});

loadMore.addEventListener('click', async () => {
    currentPage += 1;
    hiddenMoreLoad() 
showLoad() 
    
    try {
        const data = await getImagesByQuery(currentQuery, currentPage);
        createGallery(data.hits);
        checkLoadMoreStatus();

        const card = document.querySelector('.gallery-item');
        if (card) {
              const { height: cardHeight } = card.getBoundingClientRect();
            
            window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
        }
    }   catch (error) {
        console.log(error);
    } finally {
        hiddenLoad();
    }
    
});





function checkLoadMoreStatus() {
    const maxPage = Math.ceil(totalHits / 15);

    if (currentPage >= maxPage) {
        hiddenMoreLoad();
        iziToast.info({ message: "We're sorry, but you've reached the and of search results." });
        
    } else {
        showMoreLoad();
    }
}