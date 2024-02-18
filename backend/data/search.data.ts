import { IUser } from '../interfaces/user.interface';
import { IRecipePost } from '../interfaces/recipePost.interface';

import UserModel from '../models/user.model'
import RecipeModel from '../models/recipe.model';


const searchUsers = async (username: string): Promise<IUser []> => {

  if (!username) {

    return [];

  }

  const data: IUser[] | null = await UserModel.aggregate([
    {
      $match: {
        $or: [
          { username: { $regex: username, $options: 'i' } },
          { fullName: { $regex: username, $options: 'i' } }
        ]
      }
    },
    {
      $lookup: {
        from: 'recipes',
        let: { userId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: [{ $toObjectId: '$userId' }, '$$userId']
              }
            }
          }
        ],
        as: 'recipes',
      },
    },
    {
      $addFields: {
        recipeCount: { $size: '$recipes' },
      },
    },
    {
      $project: {
        recipes: 0,
      },
    }
  ]);
  

  return data;

}

const searchRecipes = async (id: string, filter: any): Promise<IRecipePost []> => {

  const { title, difficulty, rating, ingredients, dietPref, mealType, cuisineType } = filter;


  if (!title && !difficulty && !rating && (!ingredients || ingredients.length === 0) && (!dietPref || dietPref.length === 0) && (!mealType || mealType.length === 0) && (!cuisineType || cuisineType.length === 0)) {

    return [];

  }


  const data: IRecipePost [] = await RecipeModel.aggregate([
    {
      $match: {
        $and: [

          title ? { title: { $regex: title, $options: 'i' } } : {},
          difficulty ? { difficulty: difficulty } : {},
          // rating ? { rating: rating } : {},
          ingredients && ingredients.length > 0 ? { 'ingredients.ingredient': { $all: ingredients.map((ingr: any) => ingr.toLowerCase()) } } : {},
          dietPref && dietPref.length > 0 ? { dietPref: { $all: dietPref } } : {},
          mealType && mealType.length > 0 ? { mealType: { $all: mealType } } : {},
          cuisineType && cuisineType.length > 0 ? { cuisineType: { $all: cuisineType } } : {},
        ]
      }
    },
    {
      $addFields: {
        recipe: '$$ROOT',
      },
    },
    // GET RECIPE CREATOR DATA
    {
      $lookup: {
        from: 'users',
        let: { userId: '$recipe.userId' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: [ '$_id', { $toObjectId: '$$userId' } ]
              }
            }
          }
        ],
        as: 'user'
      }
    },
    {
      $unwind: '$user'
    },
    // GET FOLLOWED
    {
      $lookup: {
        from: 'follows',
        let: { followingId: '$user._id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: [{ $toObjectId: '$followingId' }, '$$followingId'] },
                  { $eq: [ '$userId', id ] },
                ],
              },
            },
          },
        ],
        as: 'userFollow',
      },
    },
    {
      $addFields: {
        'user.followed': {
          $cond: {
            if: { $gt: [{ $size: '$userFollow' }, 0] },
            then: true,
            else: false,
          },
        },
      },
    },
    // GET USER RECIPE COUNT
    {
      $lookup: {
        from: 'recipes',
        let: { userId: '$user._id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: [ '$$userId', { $toObjectId: '$userId' } ]
              }
            }
          }
        ],
        
        as: 'allRecipes',
      },
    },
    {
      $addFields: {
        'user.recipeCount': { $size: '$allRecipes' },
      },
    },
    // GET COMMENT COUNT
    {
      $lookup: {
        from: 'comments',
        let: { recipeId: '$recipe._id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: [ '$$recipeId', { $toObjectId: '$recipeId' } ]
              }
            }
          }
        ],
        
        as: 'allComments',
      },
    },
    {
      $addFields: {
        'recipe.commentCount': { $size: '$allComments' },
      },
    },
    // GET RATING AND RATING COUNT
    {
      $lookup: {
        from: 'ratings',
        let: { recipeId: '$recipe._id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: [ { $toObjectId: '$recipeId' }, '$$recipeId' ]
              }
            }
          }
        ],
        as: 'allRatings'
      }
    },
    {
      $addFields: {
        'recipe.rating': {
          $ifNull: [ { $avg: '$allRatings.rating' }, 0 ]
        },
        'recipe.ratingCount': { $size: '$allRatings' }
      }
    },
    // MATCH RATING
    {
      $match: rating ? {
        'recipe.rating': Number(rating)
      } : {}
    },
    // GET RECIPE RATING COUNT
    {
      $lookup: {
        from: 'ratings',
        let: { recipeId: '$recipe._id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: [ { $toObjectId: '$recipeId' }, '$$recipeId' ]
              }
            }
          }
        ],
        as: 'countRatings'
      }
    },
    {
      $addFields: {
        'recipe.rating': {
          $ifNull: [ { $avg: '$countRatings.rating' }, 0 ]
        }
      }
    },
    // GET CURRENT RATING
    {
      $lookup: {
        from: 'ratings',
        let: { recipeId: '$recipe._id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: [{ $toObjectId: '$recipeId' }, '$$recipeId'] },
                  { $eq: [ '$userId', id] },
                ],
              },
            },
          },
        ],
        as: 'userRating',
      },
    },
    {
      $addFields: {
        'recipe.currentRating': {
          $ifNull: [{ $first: '$userRating.rating' }, 0],
        },
      },
    },
    // CLEAN UP
    {
      $unset: 'user.password'
    },
    {
      $project: {
        _id: 0,
        user: 1,
        recipe: 1
      }
    }

  ]);


  return data;
  
}


// const searchRecipesAllFilters = async (title: string, filter: IFilter): Promise<IRecipe []> => {

//   const { ingredients, difficulty, dietPref, mealType, cuisineType } = filter;

//   const data: IRecipe [] | null = await RecipeModel.find({    
//     $and: [
//       ...(title ? [{ title: { $regex: title, $options: 'i' } }] : []),
//       ...(ingredients.length > 0 ? [{ 'ingredients.ingredient': { $in: ingredients } }] : []),
//       ...(difficulty ? [{ difficulty: difficulty }] : []),
//       ...(dietPref.length > 0 ? [{ dietPref: { $in: dietPref } }] : []),
//       ...(mealType.length > 0 ? [{ mealType: { $in: mealType } }] : []),
//       ...(cuisineType.length > 0 ? [{ cuisineType: { $in: cuisineType } }] : []),
//     ]
//   });

//   if (!data || data.length === 0) {
//     throw new Error('No users found');
//   }

//   return data;

// }

// const searchRecipesAnyFilters = async (title: string, filter: IFilter): Promise<IRecipe []> => {

//   const { ingredients, difficulty, dietPref, mealType, cuisineType } = filter;

//   const data: IRecipe [] | null = await RecipeModel.find({
//     $or: [
//       ...(title ? [{ title: { $regex: title, $options: 'i' } }] : []),
//       ...(ingredients.length > 0 ? [{ 'ingredients.ingredient': { $in: ingredients } }] : []),
//       ...(difficulty ? [{ difficulty: difficulty }] : []),
//       ...(dietPref.length > 0 ? [{ dietPref: { $in: dietPref } }] : []),
//       ...(mealType.length > 0 ? [{ mealType: { $in: mealType } }] : []),
//       ...(cuisineType.length > 0 ? [{ cuisineType: { $in: cuisineType } }] : []),
//     ],
//   });

//   if (!data || data.length === 0) {
//     throw new Error('No recipes found');
//   }

//   return data;

// }


export {
  searchUsers,
  searchRecipes
  // searchRecipesAllFilters,
  // searchRecipesAnyFilters
}
