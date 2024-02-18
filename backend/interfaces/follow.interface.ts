interface IFollow {

  _id?: string,
  userId?: string;
  followingId: string;
  createdAt?: Date;

}


export {
  IFollow
}
