import mongoose from 'mongoose';

import { IComment } from '../interfaces/comment.interface';
import { IRecipe } from './../interfaces/recipe.interface';
import { IRecipePost } from '../interfaces/recipePost.interface';
import { ICommentPost } from '../interfaces/commentPost.interface';

import CommentModel from '../models/comment.model';
import RecipeModel from './../models/recipe.model';


const createRecipe = async (data: IRecipe): Promise<void> => {

  await RecipeModel.create(data);

}

const getRecipeById = async (id: string | null, recipeId: string): Promise<IRecipePost> => {

  // const data: IRecipe | null = await RecipeModel.findById(id);

  const data: IRecipePost = (await RecipeModel.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(recipeId) } },
    { $addFields: { recipe: '$$ROOT', } },
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
    },
    {
      $sort: {
        'recipe.createdAt': -1
      }
    }    
  ]))[0];

  return data;

}

const getRecipeComments = async (id: string): Promise<ICommentPost []> => {

  const data: ICommentPost [] = await CommentModel.aggregate([
    {
      $match: {
        recipeId: id
      }
    },
    {
      $addFields: {
        comment: '$$ROOT',
      },
    },
    // GET COMMENT CREATOR DATA
    {
      $lookup: {
        from: 'users',
        let: { userId: '$comment.userId' },
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
    // CLEAN UP
    {
      $unset: 'user.password'
    },
    {
      $project: {
        _id: 0,
        user: 1,
        comment: 1
      }
    },
    {
      $sort: {
        'comment.createdAt': -1
      }
    }
  ]);

  return data;

}

const getRecomms = async (id: string): Promise<IRecipePost []> => {

  const data: IRecipePost [] = await RecipeModel.aggregate([
    {
      $match: {
        userId: { $ne: id },
      },
    },
    {
      $sample: {
        size: 5
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
        as: 'ratings'
      }
    },
    {
      $addFields: {
        'recipe.rating': {
          $ifNull: [ { $avg: '$ratings.rating' }, 0 ]
        }
      }
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
    },
    // {
    //   $sort: {
    //     'recipe.createdAt': -1
    //   }
    // }
  ]);

  return data;

}

const deleteRecipe = async (id: string): Promise<void> => {

  await RecipeModel.findByIdAndDelete(id);

}


export {
  createRecipe,
  getRecipeById,
  getRecipeComments,
  getRecomms,
  deleteRecipe
}
