import { Request, Response } from 'express';

import { IComment } from '../interfaces/comment.interface';

import * as commentData from './../data/comment.data';
import * as notificationData from './../data/notification.data';


const createComment = async (req: Request, res: Response): Promise<void> => {

  try {

    const data: IComment = req.body;

    await commentData.createComment(data);

    await notificationData.createNotification({
      userId: data.userId,
      recipeId: data.recipeId,
      type: 'comment',
      content: data.content
    });

    console.log('Comment created');
    res.status(200).send({ message: 'Comment created' });

  }
  catch (error) {

    console.log('Error while creating comment: ' + (error as Error).message);
    res.status(500).send({
      message: 'Error while creating comment',
      error: (error as Error).message  
    });
    
  }

}


export {
  createComment
}
