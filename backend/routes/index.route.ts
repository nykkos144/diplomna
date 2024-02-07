import { Router } from 'express';

import userRouter from './user.route';
import recipeRouter from './recipe.route';
import commentRouter from './comment.route';
import ratingRouter from './rating.route';
import followRouter from './follow.route';
import searchRouter from './search.route';
import notificationRouter from './notification.route';
import reportRouter from './report.route';


const router: Router = Router();

router.use('/user', userRouter);
router.use('/recipe', recipeRouter);
router.use('/comment', commentRouter);
router.use('/rating', ratingRouter);
router.use('/follow', followRouter);
router.use('/search', searchRouter);
router.use('/notification', notificationRouter);
router.use('/report', reportRouter);


export default router;
