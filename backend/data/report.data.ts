import { IRecipePost } from '../interfaces/recipePost.interface';
import { IReport } from '../interfaces/report.interface';
import { IUser } from '../interfaces/user.interface';
import { IUserPost } from '../interfaces/userPost.interface';

import RecipeModel from '../models/recipe.model';
import ReportModel from '../models/report.model';
import UserModel from '../models/user.model';


const createReport = async (data: IReport): Promise<void> => {

  await ReportModel.create(data);

}

const getRecipes = async (id: string): Promise<IRecipePost []> => {

  const data: IRecipePost [] = await ReportModel.aggregate([
    {
      $match: {
        seen: false
      }
    },
    {
      $addFields: { report: '$$ROOT' }
    },
    // GET RECIPES
    {
      $lookup: {
        from: 'recipes',
        let: { reportedId: '$reportedId' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: [ '$_id', { $toObjectId: '$$reportedId' } ]
              }
            }
          }
        ],
        
        as: 'recipe',
      },
    },
    {
      $unwind: '$recipe'
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
      $addFields: {
        'user.followed': true,
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
    //SORT
    {
      $sort: {
        'createdAt': -1
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
        recipe: 1,
        report: 1
      }
    }
    
  ]);

  return data;

}

const getUsers = async (): Promise<IUserPost []> => {

  const data: IUserPost [] = await ReportModel.aggregate([
    {
      $match: { seen: false }
    },
    {
      $addFields: { report: '$$ROOT' }
    },
    // GET RECIPE CREATOR DATA
    {
      $lookup: {
        from: 'users',
        let: { reportedId: '$reportedId' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: [ '$_id', { $toObjectId: '$$reportedId' } ]
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
    // GET RECIPE COUNT
    {
      $lookup: {
        from: 'recipes',
        let: { userId: '$user._id' },
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
        'user.recipeCount': { $size: '$recipes' },
      },
    },
    // CLEAN UP
    {
      $project: {
        _id: 0,
        report: 1,
        user: 1
      },
    },
    {
      $sort: {
        'report.createdAt': -1
      }
    }
  ]);

  return data;

}

const dismissReport = async (id: string): Promise<void> => {

  await ReportModel.findByIdAndUpdate(id, { seen: true });

}


export {
  createReport,
  getRecipes,
  getUsers,
  dismissReport
}
