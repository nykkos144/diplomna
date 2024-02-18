import { Request, Response } from 'express';

import { IRecipe } from '../interfaces/recipe.interface';
import { IComment } from '../interfaces/comment.interface';
import { IRecipePost } from '../interfaces/recipePost.interface';
import { ICommentPost } from '../interfaces/commentPost.interface';

import * as recipeData from './../data/recipe.data';

import { uploadPictures } from '../services/firebase.service';



const createRecipe = async (req: Request, res: Response): Promise<void> => {

  try {

    const data: any = req.body;

    const pictureURLs: string [] = await uploadPictures(req.files);

    const parsedData: IRecipe = {
      ...data,
      ingredients: data.ingredients && JSON.parse(data.ingredients).map((ingr: any) => ({ ...ingr, ingredient: ingr.ingredient.toLowerCase() })),
      steps: data.steps && JSON.parse(data.steps),
      dietPref: data.dietPref && JSON.parse(data.dietPref),
      mealType: data.mealType && JSON.parse(data.mealType),
      cuisineType: data.cuisineType && JSON.parse(data.cuisineType),
      pictures: pictureURLs 
    };

    await recipeData.createRecipe(parsedData);

    console.log('Recipe created');
    res.status(200).send('Recipe created');

  }
  catch (error) {

    // console.error(error);
    console.log('Error while creating recipe: ' + (error as Error).message);
    res.status(500).send({
      message: 'Error while creting recipe',
      error: (error as Error).message
    });

  }

}

const getRecipeById = async (req: Request, res: Response): Promise<void> => {

  try {

    const id: string | undefined = req.params.id;
    const userId: string | null = req.body.userId || null;
    
    const data: IRecipePost = await recipeData.getRecipeById(userId, id);

    console.log('Recipe retrived');
    res.status(200).send(data);

  }
  catch (error) {

    console.log('Error while getting recipe by id: ' + (error as Error).message);
    res.status(500).send({
      message: 'Error while getting recipe by id',
      error: (error as Error).message
    });

  }

}

const getRecipeComments = async (req: Request, res: Response): Promise<void> => {

  try {

    const recipeId: string | undefined = req.params.id;

    const data: ICommentPost [] = await recipeData.getRecipeComments(recipeId);

    console.log('Recipe comments retrived');
    res.status(200).send(data);

  }
  catch (error) {

    console.log('Error while getting recipe comments: ' + (error as Error).message);
    res.status(500).send({
      message: 'Error while getting recipe comments',
      error: (error as Error).message
    });

  }

}

const getRecomms = async (req: Request, res: Response): Promise<void> => {

  try {

    const userId: string = req.body.userId;

    const data: IRecipePost [] = await recipeData.getRecomms(userId);

    res.status(200).send(data);

  } catch (error: any) {

    console.log('Error while getting recommendations: ' + (error as Error).message);
    res.status(400).send({ message: 'Error while getting recommendations' });

  }

}


const deleteRecipe = async (req: Request, res: Response): Promise<void> => {

  try {

    const reportedId: string = req.params.id;

    await recipeData.deleteRecipe(reportedId);

    console.log('Recipe deleted');
    res.status(200).send('Recipe deleted');

  }
  catch (error) {

    console.log('Error while deleting recipe: ' + (error as Error).message);
    res.status(500).send({
      message: 'Error while deleting recipe',
      error: (error as Error).message
    });

  }

}


export {
  createRecipe,
  getRecipeById,
  getRecipeComments,
  getRecomms,
  deleteRecipe
}
