import { IFollow } from './../interfaces/follow.interface';

import FollowModel from '../models/follow.model';


const createFollow = async (data: IFollow): Promise<void> => {

  await FollowModel.create(data);

}

const deleteFollow = async (data: IFollow): Promise<void> => {

  const { userId, followingId } = data;

  await FollowModel.deleteOne({ userId, followingId });

}


export {
  createFollow,
  deleteFollow
}
