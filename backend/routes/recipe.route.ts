import { Router } from 'express';
import multer from 'multer';

import { authAdmin, authUser, getUser } from '../middleware/auth.middleware';

import * as recipeController from './../controllers/recipe.controller';


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const router: Router = Router();

router.post('/create', upload.array('pictures'), authUser, recipeController.createRecipe);

// router.post('/create', authUser, recipeController.createRecipe);
router.get('/id/:id', getUser, recipeController.getRecipeById);
router.get('/id/:id/comments', recipeController.getRecipeComments);

router.get('/recomms', getUser, recipeController.getRecomms);

router.delete('/id/:id', authUser, authAdmin, recipeController.deleteRecipe);


export default router;
