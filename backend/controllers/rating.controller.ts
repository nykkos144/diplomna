import { Request, Response } from 'express';

import { IRating } from './../interfaces/rating.interface';

import * as ratingData from './../data/rating.data';
import * as notificationData from './../data/notification.data';


const createRating = async (req: Request, res: Response): Promise<void> => {

  try {

    const data: IRating = req.body;

    await ratingData.createRating(data);

    await notificationData.createNotification({
      userId: data.userId,
      recipeId: data.recipeId,
      type: 'rating',
      content: data.rating.toString()
    });

    console.log('Rating created');
    res.status(200).send({ message: 'Rating created' });

  }
  catch (error) {

    console.log('Error while creating rating: ' + (error as Error).message);
    res.status(500).send({
      message: 'Error while creating rating',
      error: (error as Error).message
    });

  }

}

const updateRating = async (req: Request, res: Response): Promise<void> => {

  try {

    const data: IRating = req.body;

    await ratingData.updateRating(data);

    console.log('Rating updated');
    res.status(200).send({ message: 'Rating updated' });

  }
  catch (error) {

    console.log('Error while updating rating: ' + (error as Error).message);
    res.status(500).send({
      message: 'Error while updating rating',
      error: (error as Error).message
    });

  }

}


export {
  createRating,
  updateRating
}
