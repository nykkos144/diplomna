interface IUser {

  _id?: string,
  username: string;
  email: string;
  password?: string;
  fullName?: string;
  bio?: string;
  image?: string;
  backdrop?: string;
  saved?: string [];
  admin?: boolean;
  createdAt?: Date;

  recipeCount?: number;
  commentCount?: number;
  followersCount?: number;
  followingCount?: number;
  followed?: boolean;

}


export {
  IUser
}
