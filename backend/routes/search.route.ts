import { Router } from 'express';

import { getUser } from '../middleware/auth.middleware';

import * as searchController from './../controllers/search.controller';


const router = Router();

router.get('/users', searchController.searchUsers);
router.get('/recipes', getUser, searchController.searchRecipes);


export default router;
