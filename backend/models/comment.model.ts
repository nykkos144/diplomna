import { Model, Schema, model } from 'mongoose';

import { IComment } from '../interfaces/comment.interface';


const CommentSchema: Schema<IComment> = new Schema<IComment>({

  recipeId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  }

});


const CommentModel: Model<IComment> = model<IComment>('comment', CommentSchema);

export default CommentModel;