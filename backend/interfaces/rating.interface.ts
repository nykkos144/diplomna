interface IRating {

  _id?: string,
  recipeId: string;
  userId?: string;
  rating: number;
  createdAt?: Date;

}


export {
  IRating
}
