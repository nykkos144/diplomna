import { Router } from 'express';

import { authUser } from '../middleware/auth.middleware';

import * as notificationController from './../controllers/notification.controller';


const router: Router = Router();

router.post('/create', authUser, notificationController.createNotification);

router.put('/seen', authUser, notificationController.updateSeen);
router.put('/unseen', authUser, notificationController.updateUnseen);


export default router;
