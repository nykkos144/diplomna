import { Router } from 'express';

import { authUser } from '../middleware/auth.middleware';

import * as followController from './../controllers/follow.controller';


const router: Router = Router();

router.post('/create', authUser, followController.createFollow);
router.delete('/delete', authUser, followController.deleteFollow);


export default router;
