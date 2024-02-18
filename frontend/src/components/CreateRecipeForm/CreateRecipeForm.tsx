
import { IMultiForm } from './../../interfaces/multiform.interface';
import { IFormData } from './../../interfaces/formData.interface';
import { IButton } from '../../interfaces/button.interface';

import * as recipeService from './../../services/recipe.service';

import plus from './../../assets/icons/plus.svg';

import MultiForm from './../MultiForm/MultiForm';


const CreateRecipeForm = ({ buttonData, full }: { buttonData?: Partial<IButton>, full?: boolean }) => {


  const handleSubmit = async (formData: IFormData) => {

    const formDataSend = new FormData();

    formDataSend.append('title', formData.title as string);

    formDataSend.append('description', formData.description as string);

    formDataSend.append('difficulty', formData.difficulty as string);

    if (formData.video) {
      formDataSend.append('video', formData.video as string);
    }

    for (let i = 0; i < formData.pictures.length; i++) {
      formDataSend.append(`pictures`, formData.pictures[i]);
    }

    formDataSend.append('ingredients', JSON.stringify(formData.ingredients as []));

    formDataSend.append('steps', JSON.stringify((formData.steps as []).map((step: { step: string }) => step.step)));

    if (formData.dietPref && formData.dietPref.length > 0) {
      formDataSend.append('dietPref', JSON.stringify(formData.dietPref));
    }
    if (formData.mealType && formData.mealType.length > 0) {
      formDataSend.append('mealType', JSON.stringify(formData.mealType));
    }
    if (formData.cuisineType && formData.cuisineType.length > 0) {
      formDataSend.append('cuisineType', JSON.stringify(formData.cuisineType));
    }


    await recipeService.createRecipe(formDataSend);


  }


  const data: IMultiForm = {

    title: 'Create recipe',
    loading: 'Creating recipe',
    complete: 'Recipe has been created',

    steps: [
      {
        items: [
          {
            id: 'title',
            title: 'Title',
            description: 'Create a short, enticing title for your recipe',
            type: 'input',
            limit: 50,
            required: true,
            data: {
              title: 'Title',
              type: 'text'
            }
          },
          {
            id: 'description',
            title: 'Description',
            description: 'Describe your recipe briefly to give users a taste of it',
            type: 'textarea',
            limit: 200,
            required: true,
            data: {
              title: 'Description',
            }
          }
        ],
      },
      {
        items: [
          {
            id: 'ingredients',
            title: 'Ingredients',
            description: 'Summarize your recipe\'s standout ingredients',
            type: 'add',
            required: true,
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
                {
                  type: 'input',
                  data: {
                    id: 'quantity',
                    title: 'Quantity',
                    type: 'number'
                  }
                },
                {
                  type: 'dropdown',
                  data: {
                    id: 'metric',
                    itemHeight: '35px',
                    width: '60px',
                    items: [
                      'g',
                      'kg',
                      'ml',
                      'L',
                      'tsp',
                      'tbsp',
                      'pcs'
                    ],
                    top: '0px',
                    right: 'calc(100% + 10px)'
                  }
                }
              ]
            }
          },
          {
            id: 'steps',
            title: 'Steps',
            description: 'Add steps',
            type: 'add',
            required: true,
            data: {
              type: 'steps',
              items: [
                {
                  type: 'input',
                  data: {
                    id: 'step',
                    title: 'Step',
                    type: 'text'
                  }
                },
              ]
            }
          },
        ],
      },
      {
        items: [
          {
            id: 'pictures',
            title: 'Pictures',
            description: 'Add pictures of your dish to show how good it looks',
            type: 'upload',
            required: true,
            data: {
              type: 'multiple',
              accept: [ 'image/*' ]
            }
          }
        ]
      },
      {
        items: [
          {
            id: 'difficulty',
            title: 'Difficulty',
            description: 'Choose the difficulty level for your recipe',
            type: 'dropdown',
            required: true,
            data: {
              items: ['Easy', 'Medium', 'Hard'],
              extra: 'arrow',
              top: 'calc(100% + 20px)'
            }
          },
          {
            id: 'dietPref',
            title: 'Dietary preferences',
            description: 'Pick dietary preferences and help others find the perfect match',
            type: 'checkbox-group',
            data: {
              items: ['Vegan', 'Vegetarian', 'Dairy-free', 'Gluten-free', 'Low-carb', 'Keto'],
              columns: 3
            }
          },
          {
            id: 'mealType',
            title: 'Meal type',
            description: 'Pick meal type to make searching easier',
            type: 'checkbox-group',
            data: {
              items: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack'],
              columns: 3
            }
          },
          {
            id: 'cuisineType',
            title: 'Cuisine type',
            description: 'Pick cuisine type to make searching easier',
            type: 'checkbox-group',
            data: {
              items: ['Italian', 'French', 'Chinese', 'Japanese', 'Indian', 'Mexican', 'Spanish', 'Greek', 'Thai', 'Vietnamese', 'Korean', 'Brazilian', 'Caribbean', 'African', 'Russian'],
              columns: 3
            }
          }
        ]
      }
    ],

    handleSubmit: handleSubmit,
    afterSubmit: 'close'

  }
  
  return (

    <MultiForm { ...data } 
      buttonData={{
        type: 'primary',
        icon: plus,
        iconSize: '16px',
        ...buttonData
      }}
      full={ full }
    />

  );

}


export default CreateRecipeForm;
