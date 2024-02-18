import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './RecipePage.module.css';

import { IRecipePost } from '../../interfaces/recipePost.interface';
import { ICommentPost } from '../../interfaces/commentPost.interface';
import { IUser } from '../../interfaces/user.interface';

import * as recipeService from './../../services/recipe.service';

import { UserContext } from '../../contexts/user.context';

import Recipe from '../../components/Recipe/Recipe';
import CommentsBar from '../../components/CommentsBar/CommentsBar';
import NotFound from '../../components/NotFound/NotFound';


const RecipePage = () => {

  const { id } = useParams();
  
  const loggedUser = useContext<{ user: IUser | null, loading: boolean }>(UserContext).user;

  const [recipe, setRecipe] = useState<IRecipePost | null>(null);
  const [comments, setComments] = useState<ICommentPost [] | null>(null);

  const [saved, setSaved] = useState<boolean>(loggedUser && loggedUser.saved?.includes(id!) ? true : false);

  const [notFound, setNotFound] = useState<boolean>(false);


  useEffect(() => {

    const fetchRecipe = async () => {

      try {

        const data: IRecipePost = await recipeService.getRecipe(id!);
  
        if (!data) {

          setNotFound(true);
          return;

        }

        setRecipe(data);
      
      }
      catch (error) {

        setNotFound(true);

      }
      
    }

    const fetchComments = async () => {

      try {

        const data: ICommentPost [] = await recipeService.getRecipeComments(id!);
  
        setComments(data);

      }
      catch (error) {

        setNotFound(true);

      }


    }

    fetchRecipe();
    fetchComments();

  }, [])

  return (

    <>

      { notFound ? (

        <NotFound />

      ) : (

        <>
        
          { recipe ? <Recipe { ...recipe } comments={ comments } saved={ saved } setSaved={ setSaved } /> : <div></div> }

          <div className={ styles.fixedContainer }>

            <div className={ styles.fixed }>

              <CommentsBar id={ id! } comments={ comments } saved={ saved } setSaved={ setSaved } />

            </div>

          </div>

        </>

      )}
    


    </>

  );

}


export default RecipePage;
