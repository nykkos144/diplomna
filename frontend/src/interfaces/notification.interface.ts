interface INotification {

  _id?: string,
  userId?: string;
  recipientId?: string;
  recipeId?: string;
  type: string;
  content?: string;
  seen?: boolean;
  createdAt?: Date;

}

export type {
  INotification
}
