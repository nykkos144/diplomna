import { CuisineType, DietPref, Difficulty, MealType } from './../enums/filter.enum';


interface IFilter {

  ingredients: string [];
  difficulty: Difficulty | null;
  dietPref: DietPref [];
  mealType: MealType [];
  cuisineType: CuisineType [];

}


export {
  IFilter
}
