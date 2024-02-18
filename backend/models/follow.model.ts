import { Model, Schema, model } from 'mongoose';

import { IFollow } from './../interfaces/follow.interface';


const FollowSchema: Schema<IFollow> = new Schema<IFollow>({

  userId: {
    type: String,
    required: true
  },
  followingId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }

});


const FollowModel: Model<IFollow> = model('follow', FollowSchema);

export default FollowModel;
