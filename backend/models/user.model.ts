import { Model, Schema, model } from 'mongoose';

import { IUser } from './../interfaces/user.interface';


const UserSchema: Schema<IUser> = new Schema<IUser>({

  username: {
    type: String,
    required: [true, 'Username is required'],
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [20, 'Username cannot be longer than 20 characters'],
    unique: true,

    validate: [
      {
        validator: async (value: string): Promise<boolean> => {
          const user: IUser | null = await UserModel.findOne({ username: value });
          return !user;
        },
        message: 'Username is taken'
      },
      {
        validator: (value: string): boolean => {
          const usernamePattern: RegExp = /^[a-zA-Z0-9_-]+$/;
          return usernamePattern.test(value);
        },
        message: 'Invalid username'
      },
    ],

  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    maxlength: [254, 'Email is too long'],
    unique: true,

    validate: [
      {
        validator: async (value: string) => {
          const user = await UserModel.findOne({ email: value });
          return !user;
        },
        message: 'Email is already in use'
      },
      {
        validator: (value: string) => {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailPattern.test(value);
        },
        message: 'Invalid email'
      },
    ],

  },
  fullName: {
    type: String
  },
  bio: {
    type: String,
    maxlength: [200, 'Bio cannot be longer than 200 characters'],
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  image: {
    type: String
  },
  backdrop: {
    type: String
  },
  saved: {
    type: [ String ],
    default: [],
    required: true
  },
  admin: {
    type: Boolean,
    default: false,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }
  
});


const UserModel: Model<IUser> = model<IUser>('user', UserSchema);

export default UserModel;
