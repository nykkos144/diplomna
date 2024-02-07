import { IRecipe } from './recipe.interface'
import { IUser } from './user.interface'

interface IRecipePost {

  user: IUser,
  recipe: IRecipe

}

export { IRecipePost }
