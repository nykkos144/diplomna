import styles from './User.module.css';

import { IRecipePost } from '../../interfaces/recipePost.interface';

import spinner from './../../assets/icons/spinner.svg';
import longArrDown from './../../assets/icons/long-arr-down.svg';

import RecipePost from '../RecipePost/RecipePost';
import { useState } from 'react';
import { ICommentPost } from '../../interfaces/commentPost.interface';
import Dropdown from '../Dropdown/Dropdown';
import Button from '../Button/Button';
import Comment from '../Comment/Comment';


const User = ({

  recipes,
  comments,
  followed,
  handleFollow,
  handleUnfollow

}: { recipes: IRecipePost [] | null, comments: ICommentPost [] | null , followed: boolean, handleFollow: () => void, handleUnfollow: () => void }) => { 

  const [type, setType] = useState<'recipes' | 'comments'>('recipes');
  const [sortBy, setSortBy] = useState<string>('');
  const [sortType, setSortType] = useState<'increasing' | 'decreasing'>('increasing');


  const sort = (data: IRecipePost [] | ICommentPost []): IRecipePost [] | ICommentPost [] => {

    if (!data) {
      return [];
    }

    return type === 'recipes'

      ? (data as IRecipePost []).sort((a, b) => {

        switch (sortBy) {

          case 'Date':
            return sortType === 'increasing'
              ? new Date(a.recipe.createdAt || 0).getTime() - new Date(b.recipe.createdAt || 0).getTime()
              : new Date(b.recipe.createdAt || 0).getTime() - new Date(a.recipe.createdAt || 0).getTime();
          
          case 'Title':
            return sortType === 'increasing' ? a.recipe.title.localeCompare(b.recipe.title) : b.recipe.title.localeCompare(a.recipe.title);
          
          case 'Comments':
            return sortType === 'increasing' ? (a.recipe.commentCount || 0) - (b.recipe.commentCount || 0) : (b.recipe.commentCount || 0) - (a.recipe.commentCount || 0);
          
          default:
            return 0;

        }

      })

      : (data as ICommentPost []).sort((a, b) => {

        switch (sortBy) {

          case 'Date':
            return sortType === 'increasing'
              ? new Date(a.comment.createdAt || 0).getTime() - new Date(b.comment.createdAt || 0).getTime()
              : new Date(b.comment.createdAt || 0).getTime() - new Date(a.comment.createdAt || 0).getTime();
          
          default:
            return 0;

        }

      })

  }


  const handleTypeClick = (value: 'recipes' | 'comments') => {

    setType(value);

  }

  const handleSortByClick = (value: string) => {

    setSortBy(value);

  }

  const handleSortTypeClick = () => {

    setSortType(prev => prev === 'increasing' ? 'decreasing' : 'increasing')

  }

  return (

    <div className={ styles.container }>

      <div className={ styles.control }>

        <div className={ `${ styles.controlMore } ${ styles.less }` }>

          <div className={ `${ styles.typeButton } ${ type === 'recipes' ? styles.active : '' }` } onClick={() => handleTypeClick('recipes')}>
            <span>Recipes</span>
          </div>

          <div className={ `${ styles.typeButton } ${ type === 'comments' ? styles.active : '' }` } onClick={() => handleTypeClick('comments')}>
            <span>Comments</span>
          </div>

        </div>

        <div className={ `${ styles.controlMore } ${ styles.less }` }>

          <span className={ styles.sortBy }>Sort by</span>

          <Dropdown
            items={ type === 'recipes' ? ['Date', 'Title', 'Comments'] : ['Date'] }
            value={ sortBy }
            // updateValue={ setSortBy }
            updateValue={ handleSortByClick }
            extra='arrow'
            width='140px'
            height='34px'
            // contentWidth='130px'
            top='calc(100% + 15px)'
            right='0px'
            fontSize='12px'
            itemHeight='38px'
            padding='0px 20px'
            disabled={ type === 'comments' ? true : false }
          />

          <Button
            type='secondary'
            icon={ longArrDown }
            handleClick={ handleSortTypeClick }
            width='34px'
            height='34px'
            iconRotate={ sortType === 'increasing' ? '180deg' : '0deg' }
          />

        </div>

      </div>

      <div className={ styles.content }>

        { type === 'recipes' ? (

          <>

            { recipes === null ? (
          
              <div className={ styles.loader }><img src={ spinner } /></div>
              
            ) : recipes.length === 0 ? (
              
              <div className={ styles.loader }><span>No recipes</span></div>

            ) : (sort(recipes) as IRecipePost []).map((recipe: IRecipePost, index: number) => {

              return (

                <RecipePost key={ index } { ...recipe } followedOut={ followed } handleFollow={ handleFollow } handleUnfollow={ handleUnfollow } />
              
              );

            }) }

          </>

        ) : (

          <>

            { comments === null ? (
              
              <div className={ styles.loader }><img src={ spinner } /></div>
              
            ) : comments.length === 0 ? (
              
              <div className={ styles.loader }><span>No comments</span></div>

            ) : (sort(comments) as ICommentPost []).map((comment: ICommentPost, index: number) => {

              return (

                <Comment key={ index } type='recipe' { ...comment } />
              
              );

            }) }
          
          </>

        ) }

      </div>

    </div>

  )

}


export default User;
