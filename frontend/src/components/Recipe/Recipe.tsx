import { useContext, useEffect, useState } from 'react';

import styles from './Recipe.module.css';
import recipePageStyles from './../../pages/RecipePage/RecipePage.module.css';

import { IRecipePost } from '../../interfaces/recipePost.interface';
import { IRecipe } from '../../interfaces/recipe.interface';
import { IUser } from '../../interfaces/user.interface';
import { ICommentPost } from '../../interfaces/commentPost.interface';

import { UserContext } from '../../contexts/user.context';

import { getTimeElapsed } from '../../utils/time.util';

import * as userService from './../../services/user.service';
import * as followService from './../../services/follow.service';
import * as reportService from './../../services/report.service';
import * as recipeService from './../../services/recipe.service';

import dots from './../../assets/icons/dots.svg';

import RatingButton from '../RatingButton/RatingButton';
import Ellipsis from '../Ellipsis/Ellipsis';
import ScrollContainer from 'react-indiana-drag-scroll';
import Entity from '../Entity/Entity';
import Carousel from '../Carousel/Carousel';
import CommentsBar from '../CommentsBar/CommentsBar';


const Recipe = ({

  user,
  recipe,
  comments,
  saved,
  setSaved

}: IRecipePost & { comments: ICommentPost [] | null, saved: boolean, setSaved: (value: boolean) => void }) => {

  const loggedUser = useContext<{ user: IUser | null, loading: boolean }>(UserContext).user;

  const [followed, setFollowed] = useState<boolean>(user.followed || false);


  useEffect(() => {

    // setSaved(loggedUser && loggedUser.saved?.includes(recipe._id!) ? true : false);
    setFollowed(user.followed || false);

  }, [recipe, user]);


  const tags = [...recipe.dietPref, ...recipe.mealType, ...recipe.cuisineType];


  const handleFollowClick = async (followingId: string) => {

    await followService.createFollow(followingId);

    setTimeout(() => {
      setFollowed(true);
    }, 200);

  }

  const handleUnfollowClick = async (followingId: string) => {

    await followService.deleteFollow(followingId);

    setTimeout(() => {
      setFollowed(false);
    }, 200);

  }


  const handleReport = async () => {

    await reportService.createReport('recipe', recipe._id!);

  }

  const handleDelete = async () => {

    await recipeService.deleteRecipe(recipe._id!);

  }


  return (

    <div className={ styles.container }>


      <div className={ styles.top }>

        <div className={ styles.topLeft }>

          <RatingButton
            recipeId={ recipe._id! }
            rating={ recipe.rating || 0 }
            currentRating={ recipe.currentRating! }
            ratingCount={ recipe.ratingCount! }
            disabled={ !loggedUser || loggedUser._id === user._id ? true : false }
          />
          
          <div className={ styles.difficulty }>
            <span style={{ color: recipe.difficulty === 'Easy' ? '#2ECC71' : recipe.difficulty === 'Medium' ? '#FE6730' : '#FF0000' }}>{ recipe.difficulty }</span>
          </div>

        </div>

        <div className={ styles.topRight }>

          <span className={ styles.time }>{ getTimeElapsed(new Date(recipe.createdAt!)) }</span>

          <Ellipsis
            items={ !loggedUser?.admin ? [
              {
                title: followed ? 'Unfollow' : 'Follow',
                handleClick: () => followed ? handleUnfollowClick(user._id!) : handleFollowClick(user._id!)
              },
              {
                title: 'Report',
                handleClick: handleReport
              }
            ] : [
              {
                title: followed ? 'Unfollow' : 'Follow',
                handleClick: () => followed ? handleUnfollowClick(user._id!) : handleFollowClick(user._id!)
              },
              {
                title: 'Report',
                handleClick: handleReport
              },
              {
                title: 'Delete',
                handleClick: handleDelete
              }
            ]}
            buttonData={{
              type: 'secondary',
              icon: dots,
              width: '34px',
              height: '34px',
              iconSize: '4px',
              disabled: !loggedUser || loggedUser._id === user._id ? true : false
            }}
            top='calc(100% + 20px)'
            right='0px'
            itemHeight='40px'
            contentWidth='120px'
          />

        </div>

      </div>

      <div className={ styles.mainData }>

        <h1>{ recipe.title }</h1>
        <p>{ recipe.description }</p>

      </div>

      <ScrollContainer className={ styles.tagsContainer } vertical={ false }>

        <div className={ styles.tags }>

          { tags.map((item: string, index: number) => {

            return (
              <div key={ index } className={ styles.tag }>
                <span>{ item }</span>
              </div>
            )

          })}

        </div>

      </ScrollContainer>

      <div className={ styles.user }>

        <Entity type='user' content={ user } />

      </div>

      <div className={ styles.images }>

        <Carousel images={ recipe.pictures } />

      </div>

      <div className={ `${ styles.ingredients } ${ styles.table }` }>

        <table>
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>

            { recipe.ingredients.map((ingr: any, index: number) => {

              return (

                <tr key={ index }>
                  <td>{ ingr.ingredient.charAt(0).toUpperCase() + ingr.ingredient.slice(1) }</td>
                  <td>{ ingr.quantity } { ingr.metric }</td>
                </tr>

              );

            })}

          </tbody>
        </table>

      </div>

      <div className={ `${ styles.steps } ${ styles.table }` }>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Step description</th>
            </tr>
          </thead>
          <tbody>

            { recipe.steps.map((step: string, index: number) => {

              return (

                <tr key={ index }>
                  <td>{ index + 1 }</td>
                  <td>{ step.charAt(0).toUpperCase() + step.slice(1) }</td>
                </tr>

              );

            })}

          </tbody>
        </table>

      </div>

      
      <div className={ `${ styles.comments } ${ recipePageStyles.comments }` }>

        <CommentsBar id={ recipe._id! } comments={ comments } saved={ saved } setSaved={ setSaved } />

      </div>
      

    </div>

  )

}


export default Recipe;
