import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

import { verifyJWT } from '../utils/jwt.util';

import { IUser } from '../interfaces/user.interface';

import * as userData from './../data/user.data';


const authUser = (req: Request, res: Response, next: NextFunction): void => {

  try {

    const jwtToken: string | undefined = req.header('Authorization');

    if (!jwtToken) {
      throw new Error('Unauthorized access');
    }
  
    const jwtPayload: string | JwtPayload = verifyJWT(jwtToken);

    req.body.userId = (jwtPayload as JwtPayload).userId;
    
    next();

  }
  catch (error) {

    console.log(error);

    console.log('Error while authenticating user: ' + (error as Error).message);
    res.status(500).send({
      message: 'Error while authenticating user',
      error: (error as Error).message
    });

  }

}

const getUser = (req: Request, res: Response, next: NextFunction): void => {

  try {

    const jwtToken: string | undefined = req.header('Authorization');

    if (!jwtToken) {
      return next();
    }
  
    const jwtPayload: string | JwtPayload = verifyJWT(jwtToken);

    req.body.userId = (jwtPayload as JwtPayload).userId;
    
    next();

  }
  catch (error) {

    console.log('Error while getting user: ' + (error as Error).message);
    res.status(500).send({
      message: 'Error while getting user',
      error: (error as Error).message
    });

  }

}

const authAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  try {

    const userId: string = req.body.userId;

    if (!userId) {

      throw new Error('Unauthorized access');

    }

    const user: IUser = await userData.getUserById(userId);

    if (!user.admin) {

      throw new Error('Unauthorized access');

    }
    
    next();

  }
  catch (error) {

    console.log(error);

    console.log('Error while authenticating user: ' + (error as Error).message);
    res.status(500).send({
      message: 'Error while authenticating user',
      error: (error as Error).message
    });

  }

}


export { authUser, getUser, authAdmin };
