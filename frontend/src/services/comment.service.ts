import axios from 'axios';

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
import BACKEND_URL from './../constants/backendUrl.constant';


const createComment = async (recipeId: string, content: string) => {

  await axios({
    method: 'POST',
    url: `${ BACKEND_URL }/api/comment/create`,
    headers: {
      'Authorization': localStorage.getItem('Authorization')
    },
    data: {
      recipeId: recipeId,
      content: content
    }
  });

}


export { createComment }
