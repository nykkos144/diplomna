import { IComment } from './../interfaces/comment.interface';

import CommentModel from '../models/comment.model';


const createComment = async (data: IComment): Promise<void> => {

  await CommentModel.create(data);

}


export {
  createComment
}
