import axios from "axios";




export async function getImagesByQuery(query, page = 1) {
const API_KEY = '55119464-7e56b6e0115e09eda171fae18';
 const BASE_URL = 'https://pixabay.com/api/';
    
 const response = await axios.get(BASE_URL, {
        params:{
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
         safesearch: 'true',
         pageSize: 15,
        page: page,
    }
 });
    
    return response.data;
}