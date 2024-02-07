import { Request, Response } from 'express';

import { IUser } from './../interfaces/user.interface';
import { IRecipePost } from '../interfaces/recipePost.interface';

import * as searchData from './../data/search.data';


const searchUsers = async (req: Request, res: Response): Promise<void> => {

  try {

    const username: string = req.query.username as string;

    const data: IUser [] = await searchData.searchUsers(username);

    console.log('Users search completed');
    res.status(200).send(data);

  }
  catch (error) {

    console.log('Error while searching for users: ' + (error as Error).message);
    res.status(500).json({
      message: 'Error while searching for users',
      error: (error as Error).message
    });

  }

}

const searchRecipes = async (req: Request, res: Response): Promise<void> => {

  try {

    const userId = req.body.userId;

    const data: IRecipePost [] = await searchData.searchRecipes(userId, req.query);

    console.log('Recipes search completed');
    res.status(200).send(data);

  }
  catch (error) {
  
    console.log('Error while searching for recipes: ' + (error as Error).message);
    res.status(500).json({
      message: 'Error while searching for recipes',
      error: (error as Error).message
    });

  }



}


export {
  searchUsers,
  searchRecipes
}
