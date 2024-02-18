import { useEffect, useState } from 'react';

import styles from './RecommBar.module.css';
import appStyles from './../../App.module.css';

import { IUser } from './../../interfaces/user.interface';
import { IRecipePost } from '../../interfaces/recipePost.interface';

import * as userService from '../../services/user.service';
import * as recipeService from '../../services/recipe.service';

import spinner from './../../assets/icons/spinner.svg';

import Entity from '../Entity/Entity';


const RecommBar = ({ minified }: { minified?: boolean }) => {

  const [users, setUsers] = useState<IUser [] | null>(null);
  const [recipes, setRecipes] = useState<IRecipePost [] | null>(null);


  useEffect(() => {

    const fetchUsers = async () => {

      try {
        
        const data: IUser [] = await userService.getRecomms();
        setUsers(data);

      }
      catch (error) {

        console.log('Error while fetching user recomms: ' + (error as Error).message);

      }

    }
    const fetchRecipes = async () => {

      try {
        
        const data: IRecipePost [] = await recipeService.getRecomms();
        setRecipes(data);

      }
      catch (error) {

        console.log('Error while fetching user recomms: ' + (error as Error).message);

      }

    }

    // const timeout = setTimeout(() => {

    fetchUsers();
    fetchRecipes();

    // }, 1000);

    // return () => clearTimeout(timeout);

  }, []);



  return (

    // <div className={ `${ styles.container } ${ minified ? appStyles.minifiedRecommBar : '' }` }>

      // <div className={ styles.content }>
      <div className={ `${ styles.container } ${ minified ? appStyles.minifiedRecommBar : '' }` }>

        <div className={ styles.item }>

          <span className={ styles.title }>Discover users</span>

          <div className={ styles.entityContainer }>

            { !users ? (

              <div className={ styles.loader }><img src={ spinner } /></div>

            ) : users.length === 0 ? (

              <div className={ styles.loader }><span>No users found</span></div>

            ) : users.map((user: IUser, index: number) => {

              return (

                <Entity key={ index } type='user' content={ user } />

              );

            })}

          </div>

        </div>

        <div className={ styles.item }>

          <span className={ styles.title }>Discover recipes</span>

          <div className={ styles.entityContainer }>

            { !recipes ? (

              <div className={ styles.loader }><img src={ spinner } /></div>

            ) : recipes.length === 0 ? (

              <div className={ styles.loader }><span>No recipes found</span></div>

            ) : recipes.map((recipe: IRecipePost, index: number) => {

              return (

                <Entity key={ index } type='recipe' content={ recipe } />

              );

            })}

          </div>

        </div>

      </div>

    // </div>

  );

}


export default RecommBar;
