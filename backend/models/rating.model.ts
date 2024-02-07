import { Model, Schema, model } from 'mongoose';

import { IRating } from './../interfaces/rating.interface';


const RatingSchema: Schema<IRating> = new Schema<IRating>({

  recipeId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }

});


const RatingModel: Model<IRating> = model('rating', RatingSchema);

export default RatingModel;
