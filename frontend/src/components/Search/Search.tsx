import { useState } from 'react';

import styles from './Search.module.css';

import { IFormData } from '../../interfaces/formData.interface';
import { IRecipePost } from '../../interfaces/recipePost.interface';
import { IUser } from '../../interfaces/user.interface';

import * as searchService from './../../services/search.service';

import filter from './../../assets/icons/filter.svg';
import search from './../../assets/icons/search-stroke.svg';
import longArrDown from './../../assets/icons/long-arr-down.svg';
import spinner from './../../assets/icons/spinner.svg';

import Drawer from '../Drawer/Drawer';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Dropdown from '../Dropdown/Dropdown';
import FilterBar from '../FilterBar/FilterBar';
import Entity from '../Entity/Entity';
import RecipePost from '../RecipePost/RecipePost';


const Search = ({

  filters,
  setFilters,
  filterType,
  setFilterType,
  searchType,
  setSearchType

}: {

  filters: IFormData,
  setFilters: (value: IFormData) => void,
  filterType: 'users' | 'recipes',
  setFilterType: (value: 'users' | 'recipes') => void,
  searchType: 'all' | 'any',
  setSearchType: (value: 'all' | 'any') => void

}) => {

  const [value, setValue] = useState<string>('');

  const [sortBy, setSortBy] = useState<string>('');
  const [sortType, setSortType] = useState<'increasing' | 'decreasing'>('increasing');

  const [results, setResults] = useState<IUser [] | IRecipePost [] | undefined | null>();


  const sort = (data: IUser [] | IRecipePost []): IUser [] | IRecipePost [] => {

    if (!data) {
      return [];
    }

    return filterType === 'users'

      ? (data as IUser []).sort((a, b) => {

        switch (sortBy) {

          case 'Date':
            return sortType === 'increasing'
              ? new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()
              : new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
          
          case 'Name':
            return sortType === 'increasing' ? a.username.localeCompare(b.username) : b.username.localeCompare(a.username);
          
          case 'Recipes':
            return sortType === 'increasing' ? (a.recipeCount || 0) - (b.recipeCount || 0) : (b.recipeCount || 0) - (a.recipeCount || 0);
          
          default:
            return 0;

        }

      })
      : (data as IRecipePost []).sort((a, b) => {

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


  const handleTypeClick = (value: 'users' | 'recipes') => {

    setFilterType(value);
    setSortBy('');
    setResults(undefined);

  }

  const handleSortByClick = (value: string) => {

    setSortBy(value);

  }

  const handleSortTypeClick = () => {

    setSortType(prev => prev === 'increasing' ? 'decreasing' : 'increasing');
    
  }



  const handleSubmit = async () => {

    setResults(null);

    const data: IUser [] | IRecipePost [] =
    await (filterType === 'users' ? searchService.searchUsers(value) : searchService.searchRecipes(value,
    {
      ...filters,
      difficulty: filters.difficulty === 'Any' ? '' : filters.difficulty,
      rating: filters.rating === 'Any' ? '' : filters.rating,
      ingredients: (filters.ingredients as []).map((ingr: any) => ingr.ingredient)
    }));

    setResults(data);

  }


  return (

    <div className={ styles.container }>

      <div className={ styles.control }>

        <div className={ styles.controlTop }>

          <Input title={ 'Search ' + filterType.toLowerCase() } type='text' value={ value } updateValue={ setValue } />

          <div className={ styles.controlMore }>

            {/* { filterType === 'recipes' && ( */}

              <Drawer title='Filters' minified={ true } buttonData={{
                icon: filter,
                width: '50px',
                height: '50px',
                iconSize: '16px',
                disabled: filterType === 'users' ? true : false
              }}>
                <FilterBar filters={ filters } setFilters={ setFilters } searchType={ searchType } setSearchType={ setSearchType } />
              </Drawer>
            
            {/* )} */}


            <Button
              type='primary'
              icon={ search }
              handleClick={ handleSubmit }
              width='50px'
              height='50px'
              iconSize='16px'
            />
            
          </div>

        </div>

        <div className={ styles.controlBottom }>

          <div className={ `${ styles.controlMore } ${ styles.less }` }>

            <div className={ `${ styles.typeButton } ${ filterType === 'users' ? styles.active : '' }` } onClick={() => handleTypeClick('users')}>
              <span>Users</span>
            </div>

            <div className={ `${ styles.typeButton } ${ filterType === 'recipes' ? styles.active : '' }` } onClick={() => handleTypeClick('recipes')}>
              <span>Recipes</span>
            </div>

          </div>

          <div className={ `${ styles.controlMore } ${ styles.less }` }>

            <span className={ styles.sortBy }>Sort by</span>

            <Dropdown
              items={ filterType === 'users' ? ['Name', 'Recipes', 'Date'] : ['Date', 'Title', 'Comments'] }
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

      </div>

      <div className={ styles.content }>

        { results === undefined ? (

          <div className={ styles.loader }><span>Results appear here</span></div>

        ) : results === null ? (

          <div className={ styles.loader }><img src={ spinner } /></div>

        ) : results.length === 0 ? (

          <div className={ styles.loader }><span>No results found</span></div>

        ) : results && sort(results).map((result: IUser | IRecipePost, index: number) => {

          if (filterType === 'users') {

            return (

              <div key={ index } className={ styles.searchEntity }>
                <Entity type='user' content={ result } />
              </div>

            );

          }

          return (

            <RecipePost key={ index } user={ (result as IRecipePost).user } recipe={ (result as IRecipePost).recipe } />

          );

        })}

      </div>

    </div>


  );

}


export default Search;
