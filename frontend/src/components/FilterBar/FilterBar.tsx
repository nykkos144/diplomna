import { useEffect } from 'react';

import styles from './FilterBar.module.css';

import { IFormData } from '../../interfaces/formData.interface';

import CheckboxGroup from '../CheckboxGroup/CheckboxGroup';
import Dropdown from '../Dropdown/Dropdown';
import AddBlock from '../AddBlock/AddBlock';


const FilterBar = ({

  filters,
  setFilters,
  searchType,

}: {

  filters: IFormData,
  setFilters: (value: any) => void,
  searchType: 'all' | 'any',
  setSearchType?: (value: 'all' | 'any') => void

}) => {


  const allFiltersData: any = [
    {
      id: 'difficulty',
      title: 'Difficulty',
      type: 'dropdown',
      data: {
        items: ['Any', 'Easy', 'Medium', 'Hard'],
        extra: 'arrow',
        top: 'calc(100% + 20px)'
      }
    },
    {
      id: 'rating',
      title: 'Rating',
      type: 'dropdown',
      data: {
        items: ['Any', 1, 2, 3, 4, 5],
        // items: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
        extra: 'arrow',
        top: 'calc(100% + 20px)'
      }
    },
    {
      id: 'ingredients',
      title: 'Ingredients',
      type: 'add',
      data: {
        type: 'ingredients',
        items: [
          {
            type: 'input',
            data: {
              id: 'ingredient',
              title: 'Ingredient',
              type: 'text',
            }
          },
        ]
      }
    },
    {
      id: 'dietPref',
      title: 'Dietary preferences',
      type: 'checkbox-group',
      data: {
        items: ['Vegan', 'Vegetarian', 'Dairy-free', 'Gluten-free', 'Low-carb', 'Keto'],
        columns: 3
      }
    },
    {
      id: 'mealType',
      title: 'Meal type',
      type: 'checkbox-group',
      data: {
        items: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack'],
        columns: 3
      }
    },
    {
      id: 'cuisineType',
      title: 'Cuisine type',
      type: 'checkbox-group',
      data: {
        items: ['Italian', 'French', 'Chinese', 'Japanese', 'Indian', 'Mexican', 'Spanish', 'Greek', 'Thai', 'Vietnamese', 'Korean', 'Brazilian', 'Caribbean', 'African', 'Russian'],
        columns: 3
      }
    }
  ];

  const anyFiltersData: any = [
    {
      id: 'dietPref',
      title: 'Dietary preferences',
      type: 'checkbox-group',
      data: {
        items: ['Vegan', 'Vegetarian', 'Dairy-free', 'Gluten-free', 'Low-carb', 'Keto'],
        columns: 3
      }
    },
  ]


  useEffect(() => {

    const initializeFilters = () => {

      const initialFilters: any = {};

      (searchType === 'all' ? allFiltersData : anyFiltersData).forEach((filter: any) => {

        const { id, type } = filter;

        initialFilters[id] = searchType === 'all' && type === 'dropdown' ? '' : [];

      });

      setFilters(initialFilters);

    };

    initializeFilters();

  }, [searchType]);


  const setValue = (id: string, value: string) => {

    setFilters((prev: any) => ({
      ...prev,
      [id]: value
    }));

  }

  const addValue = (id: string, value: string) => {

    setFilters((prev: any) => ({
      ...prev,
      [id]: [...prev[id], value]
    }));

  }

  const removeValue = (id: string, type: 'value' | 'index', value: string | number) => {

    setFilters((prev: any) => ({
      ...prev,
      [id]: (prev[id] as any []).filter((val: string, index: number) => type === 'value' ? val !== value : index !== value )
    }));

  }

  return (

    <div className={ styles.container }>

      { (searchType === 'all' ? allFiltersData : anyFiltersData).map(({ id, title, type, data }: any, index: number) => {

        return (
          
          <div key={ index } className={ styles.filter }>

            <span className={ styles.filterTitle }>{ title }</span>

            { type === 'checkbox-group' ? (

              <CheckboxGroup
                { ...data }
                value={ filters[id] || [] }
                addValue={(value: string) => addValue(id, value)}
                removeValue={(type: 'value' | 'index', value: string) => removeValue(id, type, value)}
              />

            ) : type === 'dropdown' ? (

              <Dropdown
                { ...data }
                value={ filters[id] }
                updateValue={(value: string) => setValue(id, value)}
              />
            
            ) : type === 'add' ? (

              <AddBlock
                { ...data }
                value={ filters[id] }
                addValue={(value: string) => addValue(id, value)}
                removeValue={(type: 'value' | 'index', value: string) => removeValue(id, type, value)}
              />

            ) : '' }

          </div>

        )

      })}

    </div>

  );

}


export default FilterBar;
