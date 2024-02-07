import { INotification } from './notification.interface';
import { IRecipe } from './recipe.interface';
import { IUser } from './user.interface';


interface INotificationPost {

  user: IUser,
  notification: INotification,
  recipe?: IRecipe

}


export {
  INotificationPost
}
