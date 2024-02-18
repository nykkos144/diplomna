import axios from 'axios';

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
import BACKEND_URL from './../constants/backendUrl.constant';


const createRating = async (recipeId: string, rating: number) => {

  await axios({
    method: 'POST',
    url: `${ BACKEND_URL }/api/rating/create`,
    headers: {
      'Authorization': localStorage.getItem('Authorization')
    },
    data: {
      recipeId: recipeId,
      rating: rating
    }
  });

}

const updateRating = async (recipeId: string, rating: number) => {

  await axios({
    method: 'POST',
    url: `${ BACKEND_URL }/api/rating/update`,
    headers: {
      'Authorization': localStorage.getItem('Authorization')
    },
    data: {
      recipeId: recipeId,
      rating: rating
    }
  });

}


export { createRating, updateRating }
