import axios, { AxiosResponse } from 'axios';
import { IRecipePost } from '../interfaces/recipePost.interface';
import { IUser } from '../interfaces/user.interface';
import { IUserPost } from '../interfaces/userPost.interface';


const createReport = async (type: string, reportedId: string): Promise<void> => {

  await axios({
    method: 'POST',
    url: 'http://localhost:5000/api/report/create',
    headers: {
      'Authorization': localStorage.getItem('Authorization')
    },
    data: { type, reportedId }
  });

}

const getRecipes = async (): Promise<IRecipePost []> => {

  const data: AxiosResponse<IRecipePost []> = await axios({
    method: 'GET',
    url: 'http://localhost:5000/api/report/recipes',
    headers: {
      'Authorization': localStorage.getItem('Authorization')
    }
  });

  return data.data;

}

const getUsers = async (): Promise<IUserPost []> => {

  const data: AxiosResponse<IUserPost []> = await axios({
    method: 'GET',
    url: 'http://localhost:5000/api/report/users',
    headers: {
      'Authorization': localStorage.getItem('Authorization')
    }
  });

  return data.data;

}

const dismissReport = async (reportId: string): Promise<void> => {

  await axios({
    method: 'PUT',
    url: 'http://localhost:5000/api/report/dismiss',
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
