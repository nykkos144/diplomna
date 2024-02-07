import axios, { Axios, AxiosResponse } from 'axios';

import { IUser } from '../interfaces/user.interface';
import { IRecipePost } from '../interfaces/recipePost.interface';


const searchUsers = async (username: string): Promise<IUser []> => {

  const data: AxiosResponse<IUser []> = await axios({
    method: 'GET',
    url: 'http://localhost:5000/api/search/users',
    params: { username }
  });

  return data.data;

}

const searchRecipes = async (title: string, filters: any): Promise<IRecipePost []> => {

  const data: AxiosResponse<IRecipePost []> = await axios({
    method: 'GET',
    url: 'http://localhost:5000/api/search/recipes',
    headers: {
      'Authorization': localStorage.getItem('Authorization')
    },
    params: { title, ...filters }
  });

  return data.data;

}


export { searchUsers, searchRecipes }
