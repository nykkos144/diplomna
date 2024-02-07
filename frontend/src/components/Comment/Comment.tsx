import styles from './Comment.module.css';

import { ICommentPost } from '../../interfaces/commentPost.interface';
import { IRecipe } from '../../interfaces/recipe.interface';
import { IUser } from '../../interfaces/user.interface';

import Entity from '../Entity/Entity';


const Comment = ({ type = 'user', user, comment, recipe, creator }: ICommentPost & { type?: 'user' | 'recipe', recipe?: IRecipe, creator?: IUser } ) => {

  return (

    <div className={ styles.container }>

      <div className={ styles.top }>

        { type === 'user' ? (

          <Entity type='user' content={ user } />
          
        ) : (
            
          <Entity type='recipe' content={ { user: creator!, recipe: recipe! } } />

        )}


      </div>

      <p className={ styles.content }>{ comment.content }</p>

    </div>

  );

}


export default Comment;
