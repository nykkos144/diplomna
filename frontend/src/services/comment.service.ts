import axios from 'axios';


const createComment = async (recipeId: string, content: string) => {

  await axios({
    method: 'POST',
    url: 'http://localhost:5000/api/comment/create',
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
