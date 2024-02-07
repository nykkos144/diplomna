import { Router } from 'express';

import { authUser, getUser, authAdmin } from '../middleware/auth.middleware';

import * as reportController from './../controllers/report.controller';


const router: Router = Router();

router.post('/create', authUser, reportController.createReport);

router.get('/recipes', authUser, authAdmin, reportController.getRecipes);
router.get('/users', authUser, authAdmin, reportController.getUsers);

router.put('/dismiss', authUser, authAdmin, reportController.dismissReport);

export default router;
