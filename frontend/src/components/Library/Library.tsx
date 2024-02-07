import { useEffect, useState } from 'react';
import { IRecipePost } from '../../interfaces/recipePost.interface';

import spinner from './../../assets/icons/spinner.svg';
import longArrDown from './../../assets/icons/long-arr-down.svg';

import Dropdown from '../Dropdown/Dropdown';
import styles from './Library.module.css';
import Button from '../Button/Button';
import RecipePost from '../RecipePost/RecipePost';

import * as userService from './../../services/user.service';


const Library = () => {

  const [recipes, setRecipes] = useState<IRecipePost [] | null>(null);

  const [sortBy, setSortBy] = useState<string>('');
  const [sortType, setSortType] = useState<'increasing' | 'decreasing'>('increasing');


  useEffect(() => {

    const fetchSaved = async () => {

      try {

        const data: IRecipePost [] = await userService.getSaved();

        setRecipes(data);

      }
      catch (error) {

        console.log('User not found')

      }

    }

    fetchSaved();

  }, []);


  const sort = (data: IRecipePost []): IRecipePost [] => {

    if (!data) {
      return [];
    }

    return data.sort((a, b) => {

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

    });

  }


  const handleSortByClick = (value: string) => {

    setSortBy(value);

  }

  const handleSortTypeClick = () => {

    setSortType((prev: string) => prev === 'increasing' ? 'decreasing' : 'increasing')

  }
  

  return (

    <div className={ styles.container }>

      <div className={ styles.control }>

        <div className={ `${ styles.controlMore } ${ styles.less }` }>

          <span className={ styles.sortBy }>Sort by</span>

          <Dropdown
            items={ ['Date', 'Title', 'Comments'] }
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
          />

        </div>

        <div className={ `${ styles.controlMore } ${ styles.less }` }>

          {/* <span className={ styles.sortBy }>Sort by</span>

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
          /> */}

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


        { recipes === null ? (
      
          <div className={ styles.loader }><img src={ spinner } /></div>
          
        ) : recipes.length === 0 ? (
          
          <div className={ styles.loader }><span>No recipes</span></div>

        ) : (sort(recipes) as IRecipePost []).map((recipe: IRecipePost, index: number) => {

          return (

            <RecipePost key={ index } { ...recipe }/>
          
          );

        }) }


      </div>

    </div>

  )

}


export default Library;
