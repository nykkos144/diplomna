import axios, { Axios, AxiosResponse } from 'axios';

import { IUser } from './../interfaces/user.interface';
import { IRecipePost } from '../interfaces/recipePost.interface';
import { ICommentPost } from '../interfaces/commentPost.interface';
import { INotificationPost } from '../interfaces/notificationPost.interface';


const getLoggedUser = async (): Promise<IUser> => {

  const res: AxiosResponse<IUser | null> = await axios({
    method: 'GET',
    url: 'http://localhost:5000/api/user',
    headers: {
      'Authorization': localStorage.getItem('Authorization')
    }
  });

  if (!res.data) {

    throw new Error('Unauthorized access');

  }

  return res.data;
  
};

const login = async (username: string, password: string): Promise<string> => {

  const res: AxiosResponse<any> = await axios({
    method: 'POST',
    url: 'http://localhost:5000/api/user/login',
    data: {
      username: username,
      password: password
    }
  });

  if (!res) {

    throw new Error('Unauthorized access');

  }

  return res.data.jwtToken;
  
}


const checkUnique = async (username: string, email: string): Promise<void> => {

  await axios({
    method: 'POST',
    url: 'http://localhost:5000/api/user/check-unique',
    data: {
      username,
      email
    }
  });

}


const createUser = async (formData: any) => {

  await axios({
    method: 'POST',
    url: 'http://localhost:5000/api/user/create',
    data: formData
  });

}

const getUser = async (username: string): Promise<IUser> => {

  const data: AxiosResponse<IUser> = await axios({
    method: 'GET',
    url: `http://localhost:5000/api/user/username/${ username }`,
    headers: {
      'Authorization': localStorage.getItem('Authorization')
    }
  });

  return data.data;

}

const getUserRecipes = async (username: string): Promise<IRecipePost []> => {

  const data: AxiosResponse<IRecipePost []> = await axios({
    method: 'GET',
    url: `http://localhost:5000/api/user/username/${ username }/recipes`,
    headers: {
      'Authorization': localStorage.getItem('Authorization')
    }
  });

  return data.data;

}

const getUserComments = async (username: string): Promise<ICommentPost []> => {

  const data: AxiosResponse<ICommentPost []> = await axios({
    method: 'GET',
    url: `http://localhost:5000/api/user/username/${ username }/comments`,
    headers: {
      'Authorization': localStorage.getItem('Authorization')
    }
  });

  return data.data;

}


const getRecomms = async (): Promise<IUser []> => {

  const data: AxiosResponse<IUser []> = await axios({
    method: 'GET',
    url: 'http://localhost:5000/api/user/recomms',
    headers: {
      'Authorization': localStorage.getItem('Authorization')
    }
  });

  return data.data;

}


const getFollowingFeed = async (): Promise<IRecipePost []> => {

  const data: AxiosResponse<any []> = await axios({
    method: 'GET',
    url: 'http://localhost:5000/api/user/feed',
    headers: {
      'Authorization': localStorage.getItem('Authorization')
    }
  });

  return data.data;

}

const getDiscoverFeed = async (): Promise<IRecipePost []> => {

  const data: AxiosResponse<any []> = await axios({
    method: 'GET',
    url: 'http://localhost:5000/api/user/discover',
    headers: {
      'Authorization': localStorage.getItem('Authorization')
    }
  });

  return data.data;

}


const saveRecipe = async (recipeId: string) => {

  await axios({
    method: 'POST',
    url: 'http://localhost:5000/api/user/save',
    headers: {
      'Authorization': localStorage.getItem('Authorization')
    },
    data: { recipeId }
  });

}

const unsaveRecipe = async (recipeId: string) => {

  await axios({
    method: 'DELETE',
    url: 'http://localhost:5000/api/user/unsave',
    headers: {
      'Authorization': localStorage.getItem('Authorization')
    },
    data: { recipeId }
  });

}


const getNotifications = async (): Promise<INotificationPost []> => {

  const data: AxiosResponse<INotificationPost []> = await axios({
    method: 'GET',
    url: 'http://localhost:5000/api/user/notifications',
    headers: {
      'Authorization': localStorage.getItem('Authorization')
    }
  });

  return data.data;

}

const getSaved = async (): Promise<IRecipePost []> => {

  const data: AxiosResponse<IRecipePost []> = await axios({
    method: 'GET',
    url: `http://localhost:5000/api/user/saved`,
    headers: {
      'Authorization': localStorage.getItem('Authorization')
    }
  });

  return data.data;

}


const updateSettings = async (formData: any): Promise<void> => {

  await axios({
    method: 'PUT',
    url: `http://localhost:5000/api/user`,
    headers: {
      'Authorization': localStorage.getItem('Authorization')
    },
    data: formData
  });

}

const deleteUser = async (reportedId: string): Promise<void> => {

  await axios({
    method: 'DELETE',
    url: `http://localhost:5000/api/user/id/${ reportedId }`,
    headers: {
      'Authorization': localStorage.getItem('Authorization')
    }
  });

}


export {
  getLoggedUser,
  login,
  checkUnique,
  createUser,
  getUser,
  getUserRecipes,
  getUserComments,
  getRecomms,
  getFollowingFeed,
  getDiscoverFeed,
  saveRecipe,
  unsaveRecipe,
  getNotifications,
  getSaved,
  updateSettings,
  deleteUser
}
