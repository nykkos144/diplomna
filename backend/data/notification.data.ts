import mongoose from 'mongoose';
import { INotification } from '../interfaces/notification.interface';

import NotificationModel from '../models/notification.model';
import RecipeModel from '../models/recipe.model';


const createNotification = async (data: INotification): Promise<void> => {

  let recipientId = data.recipientId;

  if (!recipientId) {

    if (!data.recipeId) {

      throw new Error('Error');

    }

    const rec = await RecipeModel.findById(data.recipeId);

    if (!rec) {

      throw new Error('Error');

    }

    recipientId = rec.userId;

  }

  await NotificationModel.create({ ...data, recipientId });

}

const updateSeen = async (userId: string, notifId: string): Promise<void> => {

  await NotificationModel.updateOne(
    { recipientId: userId, _id: notifId },
    { $set: { seen: true } }
  );

}

const updateUnseen = async (userId: string, notifId: string): Promise<void> => {

  await NotificationModel.updateOne(
    { recipientId: userId, _id: notifId },
    { $set: { seen: false } }
  );

}


export {
  createNotification,
  updateSeen,
  updateUnseen
}
