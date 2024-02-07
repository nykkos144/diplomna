import { Request, Response } from 'express';

import { IFollow } from './../interfaces/follow.interface';

import * as followData from './../data/follow.data';
import * as notificationData from './../data/notification.data';


const createFollow = async (req: Request, res: Response): Promise<void> => {

  try {

    const data: IFollow = req.body;

    await followData.createFollow(data);

    await notificationData.createNotification({
      userId: data.userId,
      recipientId: data.followingId,
      type: 'follow',
    });

    console.log('Follow created');
    res.status(200).send({ message: 'Follow created' });

  }
  catch (error) {

    console.log('Error while creating follow: ' + (error as Error).message);
    res.status(500).send({
      message: 'Error while creating follow',
      error: (error as Error).message
    });

  }

}

const deleteFollow = async (req: Request, res: Response): Promise<void> => {

  try {

    const data: IFollow = req.body;

    await followData.deleteFollow(data);

    console.log('Follow deleted');
    res.status(200).send({ message: 'Follow deleted' });

  }
  catch (error) {

    console.log('Error while deleting follow: ' + (error as Error).message);
    res.status(500).send({
      message: 'Error while deleting follow',
      error: (error as Error).message
    });

  }

}


export {
  createFollow,
  deleteFollow
}
