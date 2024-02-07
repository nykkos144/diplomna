import { Router } from 'express';

import { authUser } from '../middleware/auth.middleware';

import * as ratingController from './../controllers/rating.controller';


const router: Router = Router();

router.post('/create', authUser, ratingController.createRating);
router.post('/update', authUser, ratingController.updateRating);


export default router;
