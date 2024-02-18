import { Model, Schema, model } from 'mongoose';

import { Metric, Difficulty, DietPref, MealType, CuisineType } from '../enums/filter.enum';

import { IRecipe } from './../interfaces/recipe.interface';


const RecipeSchema: Schema<IRecipe> = new Schema<IRecipe>({

  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  pictures: {
    type: [ String ],
    required: true,
  },
  ingredients: [
    {
      quantity: {
        type: Number,
        required: true,
      },
      metric: {
        type: String,
        enum: Object.values(Metric),
        required: true,
      },
      ingredient: {
        type: String,
        required: true,
      },
    },
  ],
  steps: {
    type: [ String ],
    required: true,
  },
  video: {
    type: String || null,
    required: false
  },
  difficulty: {
    type: String,
    enum: Object.values(Difficulty),
    required: true,
  },
  dietPref: [
    {
      type: String,
      enum: Object.values(DietPref),
      required: true,
    }
  ],
  mealType: [
    {
      type: String,
      enum: Object.values(MealType),
      required: true,
    }
  ],
  cuisineType: [
    {
      type: String,
      enum: Object.values(CuisineType),
      required: true,
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }

});


const RecipeModel: Model<IRecipe> = model<IRecipe>('recipe', RecipeSchema);

export default RecipeModel;
