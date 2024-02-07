import { Request, Response } from 'express';

import { INotification } from './../interfaces/notification.interface';

import * as notificationData from './../data/notification.data';


const createNotification = async (req: Request, res: Response): Promise<void> => {

  try {

    const data: INotification = req.body;

    await notificationData.createNotification(data);
    
    console.log('Notification created');
    res.status(200).send({ message: 'Notification created' });

  }
  catch (error) {

    console.log('Error while creating notification: ' + (error as Error).message);
    res.status(500).send({
      message: 'Error while creating notification',
      error: (error as Error).message
    });

  }

}

const updateSeen = async (req: Request, res: Response): Promise<void> => {

  try {

    const notifId: string = req.body.notifId;
    const userId: string = req.body.userId;

    await notificationData.updateSeen(userId, notifId);
    
    console.log('Notification seen');
    res.status(200).send({ message: 'Notification seen' });

  }
  catch (error) {

    console.log('Error while seen notification: ' + (error as Error).message);
    res.status(500).send({
      message: 'Error while seen notification',
      error: (error as Error).message
    });

  }

}

const updateUnseen = async (req: Request, res: Response): Promise<void> => {

  try {

    const notifId: string = req.body.notifId;
    const userId: string = req.body.userId;

    await notificationData.updateUnseen(userId, notifId);
    
    console.log('Notification unseen');
    res.status(200).send({ message: 'Notification unseen' });

  }
  catch (error) {

    console.log('Error while unseen notification: ' + (error as Error).message);
    res.status(500).send({
      message: 'Error while unseen notification',
      error: (error as Error).message
    });

  }

}



export {
  createNotification,
  updateSeen,
  updateUnseen
}
