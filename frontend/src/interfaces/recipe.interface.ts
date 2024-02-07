import { CuisineType, DietPref, Difficulty, MealType } from '../enums/filter.enum';


interface IRecipe {

  _id?: string,
  userId?: string;
  title: string;
  description: string;
  pictures: string [];
  ingredients: {
    quantity: number;
    metric: string;
    ingredient: string;
  } [];
  rating?: number;
  steps: string [];
  video: string | null;
  difficulty: Difficulty | null;
  dietPref: DietPref [];
  mealType: MealType [];
  cuisineType: CuisineType [];
  createdAt?: Date;
  
  ratingCount?: number;
  currentRating?: number;
  commentCount?: number;

}


export type { IRecipe }
