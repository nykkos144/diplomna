import axios, { AxiosResponse } from 'axios';
import { IRecipePost } from '../interfaces/recipePost.interface';
import { IUserPost } from '../interfaces/userPost.interface';

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
import BACKEND_URL from './../constants/backendUrl.constant';


const createReport = async (type: string, reportedId: string): Promise<void> => {

  await axios({
    method: 'POST',
    url: `${ BACKEND_URL }/api/report/create`,
    headers: {
      'Authorization': localStorage.getItem('Authorization')
    },
    data: { type, reportedId }
  });

}

const getRecipes = async (): Promise<IRecipePost []> => {

  const data: AxiosResponse<IRecipePost []> = await axios({
    method: 'GET',
    url: `${ BACKEND_URL }/api/report/recipes`,
    headers: {
      'Authorization': localStorage.getItem('Authorization')
    }
  });

  return data.data;

}

const getUsers = async (): Promise<IUserPost []> => {

  const data: AxiosResponse<IUserPost []> = await axios({
    method: 'GET',
    url: `${ BACKEND_URL }/api/report/users`,
    headers: {
      'Authorization': localStorage.getItem('Authorization')
    }
  });

  return data.data;

}

const dismissReport = async (reportId: string): Promise<void> => {

  await axios({
    method: 'PUT',
    url: `${ BACKEND_URL }/api/report/dismiss`,
    headers: {
      'Authorization': localStorage.getItem('Authorization')
    },
    data: { reportId }
  });

}


export {
  createReport,
  getRecipes,
  getUsers,
  dismissReport
}
