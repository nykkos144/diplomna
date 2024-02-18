import { Router } from 'express';

import { authUser } from '../middleware/auth.middleware';

import * as commentController from './../controllers/comment.controller';


const router: Router = Router();

router.post('/create', authUser, commentController.createComment);


export default router;
