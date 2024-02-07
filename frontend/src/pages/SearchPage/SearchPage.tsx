import { useState } from 'react';

import styles from './SearchPage.module.css';

import { IFormData } from '../../interfaces/formData.interface';

import Search from '../../components/Search/Search';
import FilterBar from '../../components/FilterBar/FilterBar';


const SearchPage = () => {

  const [filters, setFilters] = useState<IFormData>({});
  const [filterType, setFilterType] = useState<'users' | 'recipes'>('users');
  const [searchType, setSearchType] = useState<'all' | 'any'>('all');

  return (

    <>
    
      <Search filters={ filters } setFilters={ setFilters } filterType={ filterType } setFilterType={ setFilterType } searchType={ searchType } setSearchType={ setSearchType } />

      <div className={ `${ styles.fixedContainer } ${ filterType === 'users' ? styles.disabled : '' }` }>

        <div className={ styles.fixed }>

          <FilterBar filters={ filters } setFilters={ setFilters } searchType={ searchType } setSearchType={ setSearchType } />

        </div>

      </div>

    </>

  );

}


export default SearchPage;
