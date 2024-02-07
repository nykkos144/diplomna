interface IComment {

  _id?: string,
  recipeId: string;
  userId?: string;
  content: string;
  createdAt?: Date;

}


export type { IComment }
