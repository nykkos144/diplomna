import { Request, Response } from 'express';

import bcrypt from 'bcrypt';

import { IUser } from './../interfaces/user.interface';
import { IRecipe } from './../interfaces/recipe.interface';
import { INotification } from './../interfaces/notification.interface';

import { generateJWT } from '../utils/jwt.util';

import * as userData from './../data/user.data';

// import { uploadPictures } from '../services/dropbox.service';
import { uploadPictures } from '../services/firebase.service';
import { IRecipePost } from '../interfaces/recipePost.interface';
import { ICommentPost } from '../interfaces/commentPost.interface';
import { INotificationPost } from '../interfaces/notificationPost.interface';


const createUser = async (req: Request, res: Response): Promise<void> => {

  try {

    const password: string = req.body.password;

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const pictureURLs: string [] = await uploadPictures(req.files);

    await userData.createUser({

      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      fullName: req.body.fullName,
      bio: req.body.bio,
      image: pictureURLs.length > 0 ? pictureURLs[0] : undefined

    });

    console.log('User created');
    res.status(200).send({ message: 'User created' });
    
  }
  catch (error: any) {

    // console.error(error);
    console.log('Error while creating user: ' + (error as Error).message);
    res.status(500).send({
      message: 'Error while creating user',
      error: error.errors ? error.errors[Object.keys(error.errors)[0]].message : error.message
    });

  }

}

const login = async (req: Request, res: Response): Promise<void> => {

  try {

    const username: string  = req.body.username;
    const password: string = req.body.password;

    const user: IUser = await userData.getUserByUsername(username, true);

    const match = await bcrypt.compare(password, user.password!);

    if (!match) {

      console.log('Password is wrong');
      throw new Error('Wrong username or password');

    }

    const jwtToken = generateJWT(user._id!);

    console.log('Logged in');
    // res.setHeader('Authorization', jwtToken);
    // res.status(200).json({ message: 'Logged in' });
    res.status(200).json({
      message: 'Logged in',
      jwtToken: jwtToken
    });

  }
  catch (error) {

    console.log('Error while logging in: ' + (error as Error).message);
    res.status(500).json({
      message: 'Error while logging in',
      error: (error as Error).message === 'User not found' ? 'Wrong username or password' : (error as Error).message
    });

  }
  
}

const checkUnique = async (req: Request, res: Response): Promise<void> => {

  try {
    
    const { username, email } = req.body;
    
    await userData.checkUnique(username, email);

    res.status(200).send({
      message: 'Data is unique'
    });

  }
  catch (error) {

    console.log('Error while checking unique: ' + (error as Error).message);
    res.status(500).json({
      message: 'Error while checking unique',
      error: (error as Error).message
    });

  }

}

const getUser = async (req: Request, res: Response): Promise<void> => {

  try {

    const userId: string = req.body.userId;

    const data: IUser = await userData.getUserById(userId);

    res.status(200).send(data);

  } catch (error: any) {

    console.log('Error while getting user by username: ' + (error as Error).message);
    res.status(400).json({ message: 'Error while getting user by id' });

  }

}

const getUserByUsername = async (req: Request, res: Response): Promise<void> => {

  try {

    const username: string | undefined = req.params.username;
    const userId: string | undefined = req.body.userId;

    if (!username) {

      throw new Error('User not found');

    }

    const data: IUser | null = await userData.getUserByUsername(username, false, userId);

    if (!data) {

      throw new Error('User not found');

    }

    res.status(200).send(data);

  } catch (error: any) {

    console.log('Error while getting user by username: ' + (error as Error).message);
    res.status(400).json({ message: 'Error while getting user by username' });

  }

}

const getUserRecipes = async (req: Request, res: Response): Promise<void> => {

  try {

    const username: string | undefined = req.params.username;
    const userId: string | undefined = req.body.userId;

    if (!username) {
      throw new Error('User not found');
    }

    const data: IRecipePost [] = await userData.getUserRecipes(username, userId);

    res.status(200).send(data);
    
  }
  catch (error: any) {

    console.log('Error while getting user\' recipes: ' + (error as Error).message);
    res.status(400).json({ message: 'Error while getting user\' recipes: ' });

  }

}

const getUserComments = async (req: Request, res: Response): Promise<void> => {

  try {

    const username: string | undefined = req.params.username;

    if (!username) {
      throw new Error('User not found');
    }

    const data: ICommentPost [] = await userData.getUserComments(username);

    res.status(200).send(data);
    
  }
  catch (error: any) {

    console.log('Error while getting user\' comments: ' + (error as Error).message);
    res.status(400).json({ message: 'Error while getting user\' comments: ' });

  }

}

const getNotifications = async (req: Request, res: Response): Promise<void> => {

  try {

    const userId: string = req.body.userId;

    const data: INotificationPost [] = await userData.getNotifications(userId);

    res.status(200).send(data);

  } catch (error: any) {

    console.log('Error while getting notifications: ' + (error as Error).message);
    res.status(400).json({ message: 'Error while getting notifications' });

  }

}

const getFeed = async (req: Request, res: Response): Promise<void> => {

  try {

    const userId: string = req.body.userId;

    const data: IRecipePost [] = await userData.getFeed(userId);

    res.status(200).send(data);

  } catch (error: any) {

    console.log('Error while getting feed: ' + (error as Error).message);
    res.status(400).json({ message: 'Error while getting feed' });

  }

}

const getDiscover = async (req: Request, res: Response): Promise<void> => {

  try {

    const userId: string = req.body.userId;

    const data: IRecipePost [] = await userData.getDiscover(userId);

    res.status(200).send(data);

  }
  catch (error: any) {

    console.log('Error while getting discover: ' + (error as Error).message);
    res.status(400).json({ message: 'Error while getting discover' });

  }

}

const getRecomms = async (req: Request, res: Response): Promise<void> => {

  try {

    const userId: string = req.body.userId;

    const data: IUser [] = await userData.getRecomms(userId);

    res.status(200).send(data);

  }
  catch (error: any) {

    console.log('Error while getting recommendations: ' + (error as Error).message);
    res.status(400).send({ message: 'Error while getting recommendations' });

  }

}


const saveRecipe = async (req: Request, res: Response): Promise<void> => {

  try {

    const { userId, recipeId } = req.body;

    await userData.saveRecipe(userId, recipeId);

    console.log('Recipe saved');
    res.status(200).send({ message: 'Recipe saved' });

  }
  catch (error: any) {

    console.log('Error while saving recipe: ' + (error as Error).message);
    res.status(400).send({ message: 'Error while saving recipe' });

  }

}

const unsaveRecipe = async (req: Request, res: Response): Promise<void> => {

  try {

    const { userId, recipeId } = req.body;

    await userData.unsaveRecipe(userId, recipeId);

    console.log('Saved recipe removed');
    res.status(200).send({ message: 'Saved recipe removed' });

  }
  catch (error: any) {

    console.log('Error while removing saved recipe: ' + (error as Error).message);
    res.status(400).send({ message: 'Error while removing saved recipe' });

  }

}

const getSaved = async (req: Request, res: Response): Promise<void> => {

  try {

    const userId: string = req.body.userId;

    const data: IRecipePost [] = await userData.getSaved(userId);

    console.log('Saved retrieved');
    res.status(200).send(data);

  }
  catch (error: any) {

    console.log('Error while getting saved: ' + (error as Error).message);
    res.status(400).send({ message: 'Error while getting saved' });

  }

}

const updateSettings = async (req: Request, res: Response): Promise<void> => {

  try {

    const data = req.body;

    const pictures = req.files && (req.files as any)['pictures'] ? (req.files as any)['pictures'] : [];
    const backdrop = req.files && (req.files as any)['backdrop'] ? (req.files as any)['backdrop'] : [];

    const pictureURLs: string [] = await uploadPictures(pictures);
    const backdropURLs: string [] = await uploadPictures(backdrop);

    await userData.updateSettings({
      ...data,
      image: pictureURLs.length > 0 ? pictureURLs[0] : undefined,
      backdrop: backdropURLs.length > 0 ? backdropURLs[0] : undefined
    });

    console.log('Settings updated');
    res.status(200).send({ message: 'Settings updated' });

  }
  catch (error: any) {

    console.log('Error while updating settings: ' + (error as Error).message);
    res.status(400).send({ message: 'Error while updating settings' });

  }

}

const deleteUser = async (req: Request, res: Response): Promise<void> => {

  try {

    const reportedId = req.params.id;

    await userData.deleteUser(reportedId);

    console.log('User deleted');
    res.status(200).send({ message: 'User deleted' });

  }
  catch (error: any) {

    console.log('Error while deleting user: ' + (error as Error).message);
    res.status(400).send({ message: 'Error while deleting user' });

  }

}

export {
  createUser,
  login,
  checkUnique,
  getUser,
  getUserByUsername,
  getUserRecipes,
  getUserComments,
  getNotifications,
  getFeed,
  getDiscover,
  getRecomms,
  saveRecipe,
  unsaveRecipe,
  getSaved,
  updateSettings,
  deleteUser
}
