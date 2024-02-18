import axios, { AxiosResponse } from 'axios';

import { IRecipePost } from '../interfaces/recipePost.interface';
import { ICommentPost } from '../interfaces/commentPost.interface';

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
import BACKEND_URL from './../constants/backendUrl.constant';


const createRecipe = async (formData: any) => {

  await axios({
    method: 'POST',
    url: `${ BACKEND_URL }/api/recipe/create`,
    headers: {
      'Authorization': localStorage.getItem('Authorization')
    },
    data: formData
  });

}

const getRecipe = async (id: string): Promise<IRecipePost> => {

  const data: AxiosResponse<IRecipePost> = await axios({
    method: 'GET',
    url: `${ BACKEND_URL }/api/recipe/id/${ id }`,
    headers: {
      'Authorization': localStorage.getItem('Authorization')
    }
  });

  return data.data;

}

const getRecomms = async (): Promise<IRecipePost []> => {

  const data: AxiosResponse<IRecipePost []> = await axios({
    method: 'GET',
    url: `${ BACKEND_URL }/api/recipe/recomms`,
    headers: {
      'Authorization': localStorage.getItem('Authorization')
    }
  });

  return data.data;

}


const getRecipeComments = async (id: string): Promise<ICommentPost []> => {

  const data: AxiosResponse<ICommentPost []> = await axios({
    method: 'GET',
    url: `${ BACKEND_URL }/api/recipe/id/${ id }/comments`
  });

  return data.data;

}

const deleteRecipe = async (reportedId: string): Promise<void> => {

  await axios({
    method: 'DELETE',
    url: `${ BACKEND_URL }/api/recipe/id/${ reportedId }`,
    headers: {
      'Authorization': localStorage.getItem('Authorization')
    }
  });

}


export {
  createRecipe,
  getRecipe,
  getRecomms,
  getRecipeComments,
  deleteRecipe
}
