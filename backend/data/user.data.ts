import mongoose from 'mongoose';

import { IUser } from './../interfaces/user.interface';
import { INotification } from '../interfaces/notification.interface';
import { IRecipePost } from '../interfaces/recipePost.interface';

import UserModel from './../models/user.model';
import FollowModel from '../models/follow.model';
import NotificationModel from '../models/notification.model';
import RecipeModel from '../models/recipe.model';
import { ICommentPost } from '../interfaces/commentPost.interface';
import CommentModel from '../models/comment.model';
import { INotificationPost } from '../interfaces/notificationPost.interface';


const createUser = async (data: IUser): Promise<void> => {

  await UserModel.create(data);

}

const getUserById = async (id: string): Promise<IUser> => {

  const data: IUser = await UserModel.findById(id).select('-password');

  if (!data) {
    throw new Error('User not found');
  }

  return data;

}

const getUserByUsername = async (username: string, withPassword: boolean = false, id?: string): Promise<IUser> => {

  if (withPassword) {

    const data: IUser | null = await UserModel.findOne({ username });

    if (!data) {
      throw new Error('User not found');
    }

    return data;

  }

  const data: IUser = (await UserModel.aggregate([
    {
      $match: { username: username }
    },
    // GET FOLLOWED
    {
      $lookup: {
        from: 'follows',
        let: { followingId: '$_id' },
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
        'followed': {
          $cond: {
            if: { $gt: [{ $size: '$userFollow' }, 0] },
            then: true,
            else: false,
          },
        },
      },
    },
    // GET FOLLOWING COUNT
    {
      $lookup: {
        from: 'follows',
        let: { userId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: [{ $toObjectId: '$userId' }, '$$userId']
              },
            },
          },
        ],
        as: 'followings',
      },
    },
    {
      $addFields: {
        'followingCount': { $size: '$followings' }
      },
    },
    // GET FOLLOWERS COUNT
    {
      $lookup: {
        from: 'follows',
        let: { userId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: [{ $toObjectId: '$followingId' }, '$$userId']
              },
            },
          },
        ],
        as: 'followers',
      },
    },
    {
      $addFields: {
        'followersCount': { $size: '$followers' }
      },
    },
    // GET USER RECIPE COUNT
    {
      $lookup: {
        from: 'recipes',
        let: { userId: '$_id' },
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
        'recipeCount': { $size: '$allRecipes' },
      },
    },
    // GET COMMENT COUNT
    {
      $lookup: {
        from: 'comments',
        let: { userId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: [ '$$userId', { $toObjectId: '$userId' } ]
              }
            }
          }
        ],
        
        as: 'allComments',
      },
    },
    {
      $addFields: {
        'commentCount': { $size: '$allComments' },
      },
    },
    // CLEAN UP
    {
      $project: {
        id: 0,
        userFollow: 0,
        followings: 0,
        followers: 0,
        allRecipes: 0,
        allComments: 0
      }
    }
  ]))[0];

  if (!data) {
    throw new Error('User not found');
  }
  
  return data;

}

const getUserRecipes = async (username: string, id?: string): Promise<IRecipePost []> => {

  const data: IRecipePost [] = await UserModel.aggregate([
    {
      $match: { username: username }
    },
    {
      $addFields: { user: '$$ROOT' }
    },
    // GET RECIPES
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
        
        as: 'recipe',
      },
    },
    {
      $unwind: '$recipe'
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
        recipe: 1,
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


const getUserComments = async (username: string): Promise<ICommentPost []> => {

  const data: ICommentPost [] = await UserModel.aggregate([
    {
      $match: { username: username }
    },
    {
      $addFields: { user: '$$ROOT' }
    },
    // GET COMMENTS
    {
      $lookup: {
        from: 'comments',
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
        
        as: 'comment',
      },
    },
    {
      $unwind: '$comment'
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
    // GET RECIPE
    {
      $lookup: {
        from: 'recipes',
        let: { recipeId: '$comment.recipeId' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: [ '$_id', { $toObjectId: '$$recipeId' } ]
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
        as: 'creator'
      }
    },
    {
      $unwind: '$creator'
    },
    // CLEAN UP
    {
      $unset: 'user.password'
    },
    {
      $unset: 'creator.password'
    },
    {
      $project: {
        _id: 0,
        user: 1,
        comment: 1,
        recipe: 1,
        creator: 1
      }
    },
    
  ]);


  return data;

}

const checkUnique = async (username: string, email: string): Promise<null> => {

  const data: IUser | null = await UserModel.findOne({ $or: [{ username }, { email }] })

  if (data) {
    throw new Error('Username or email is already taken');
  }
  
  return data;

}


const getNotifications = async (id: string): Promise<INotificationPost []> => {
  
  const data: INotificationPost [] = await NotificationModel.aggregate([
    {
      $match: { recipientId: id }
    },
    {
      $addFields: { notification: '$$ROOT' }
    },
    // GET CREATOR DATA
    {
      $lookup: {
        from: 'users',
        let: { userId: '$notification.userId' },
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
    // GET RECIPES
    {
      $lookup: {
        from: 'recipes',
        let: { recipeId: '$notification.recipeId' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: [ '$_id', { $toObjectId: '$$recipeId' } ]
              }
            }
          }
        ],
        
        as: 'recipe',
      },
    },
    // {
    //   $unwind: '$recipe'
    // },
    {
      $unwind: { path: '$recipe', preserveNullAndEmptyArrays: true }
    },
    // CLEAN UP
    {
      $unset: 'user.password'
    },
    {
      $project: {
        _id: 0,
        user: 1,
        notification: 1,
        recipe: 1
      }
    },
    {
      $sort: {
        'notification.createdAt': -1
      }
    }
  ]);

  return data;

}

const getFeed = async (id: string): Promise<any []> => {

  const data: IRecipePost [] = await FollowModel.aggregate([
    {
      $match: {
        userId: id
      }
    },
    // GET RECIPES OF FOLLOWED USERS
    {
      $lookup: {
        from: 'recipes',
        localField: 'followingId',
        foreignField: 'userId',
        as: 'recipe'
      }
    },
    {
      $unwind: '$recipe'
    },
    // GET RECIPE CREATOR DATA
    {
      $lookup: {
        from: 'users',
        let: { followingId: '$followingId' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: [ '$_id', { $toObjectId: '$$followingId' } ]
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
    // CLEAN UP
    {
      $unset: 'user.password'
    },
    {
      $project: {
        _id: 0,
        user: 1,
        recipe: 1,
      }
    },
    {
      $sort: {
        'recipe.createdAt': -1
      }
    }
  ]);

  return data;

}

const getDiscover = async (id: string): Promise<IRecipePost []> => {

  const data: IRecipePost [] = await RecipeModel.aggregate([
    {
      $match: {
        userId: { $ne: id },
      },
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
  ]);

  return data;

}

const getRecomms = async (id: string): Promise<IUser []> => {

  const data: IUser[] = await UserModel.aggregate([
    {
      $match: {
        _id: { $ne: new mongoose.Types.ObjectId(id) },
      },
    },
    {
      $sample: {
        size: 5
      }
    },
    {
      $lookup: {
        from: 'recipes',
        // localField: '_id',
        // foreignField: 'userId',
        let: { userId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: [ '$$userId', { $toObjectId: '$userId' } ]
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
    },
    {
      $sort: {
        recipeCount: -1
      }
    },
    // {
    //   $limit: 5,
    // },
  ]);

  return data;

}


const saveRecipe = async (id: string, recipeId: string): Promise<void> => {

  await UserModel.findByIdAndUpdate(id, { $push: { saved: recipeId } });

}

const unsaveRecipe = async (id: string, recipeId: string): Promise<void> => {

  await UserModel.findByIdAndUpdate(id, { $pull: { saved: recipeId } });

}

const getSaved = async (id: string): Promise<IRecipePost []> => {

  const data: IRecipePost [] = await UserModel.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(id) }
    },
    // {
    //   $addFields: { user: '$$ROOT' }
    // },
    // GET RECIPES
    {
      $lookup: {
        from: 'recipes',
        let: { saved: '$saved' },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: ['$_id', { $map: { input: '$$saved', as: 'id', in: { $toObjectId: '$$id' } } }]
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
        recipe: 1,
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


const updateSettings = async (data: any): Promise<void> => {

  // const { userId, fullName, bio, image, backdrop } = data;
  // await UserModel.findByIdAndUpdate(userId, { fullName: fullName });

  const { userId, ...updateFields } = data;
  await UserModel.findByIdAndUpdate(userId, Object.fromEntries(Object.entries(updateFields).filter(([_, value]) => value !== undefined)));

}

const deleteUser = async (id: string): Promise<void> => {

  await UserModel.findByIdAndDelete(id);

}


export {
  createUser,
  getUserById,
  getUserByUsername,
  getUserRecipes,
  getUserComments,
  checkUnique,
  getNotifications,
  getFeed,
  getDiscover,
  getRecomms,
  saveRecipe,
  unsaveRecipe,
  getSaved,
  updateSettings,
  deleteUser
}
