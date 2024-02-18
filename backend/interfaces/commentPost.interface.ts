import { IComment } from './comment.interface';
import { IUser } from './user.interface';


interface ICommentPost {

  user: IUser;
  comment: IComment;

}


export type { ICommentPost };
