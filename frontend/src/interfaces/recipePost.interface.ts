import { IRecipe } from './recipe.interface'
import { IReport } from './report.interface'
import { IUser } from './user.interface'

interface IRecipePost {

  user: IUser,
  recipe: IRecipe,
  report?: IReport

}

export type { IRecipePost }
