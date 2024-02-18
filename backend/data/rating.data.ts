import { IRating } from './../interfaces/rating.interface';

import RatingModel from '../models/rating.model';


const createRating = async (data: IRating): Promise<void> => {

  await RatingModel.create(data);

}

const updateRating = async (data: IRating): Promise<void> => {

  const { userId, recipeId, rating } = data;

  await RatingModel.updateOne(
    { userId, recipeId },
    { $set: { rating, createdAt: new Date() } },
    { upsert: true }
  );

}


export {
  createRating,
  updateRating
}
