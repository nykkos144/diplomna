import { Model, Schema, model } from 'mongoose';

import { INotification } from '../interfaces/notification.interface';


const NotificationSchema: Schema<INotification> = new Schema<INotification>({

  userId: {
    type: String,
    required: true
  },
  recipientId: {
    type: String,
    required: true
  },
  recipeId: {
    type: String,
    default: null
  },
  type: {
    type: String,
    required: true
  },
  content: {
    type: String,
  },
  seen: {
    type: Boolean,
    required: true,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }

});


const NotificationModel: Model<INotification> = model('notification', NotificationSchema);

export default NotificationModel;
