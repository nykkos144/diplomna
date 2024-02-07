import axios from 'axios';


const createRating = async (recipeId: string, rating: number) => {

  await axios({
    method: 'POST',
    url: 'http://localhost:5000/api/rating/create',
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
    url: 'http://localhost:5000/api/rating/update',
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
