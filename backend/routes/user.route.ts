import { Router } from 'express';
import multer from 'multer';

import { authAdmin, authUser, getUser } from '../middleware/auth.middleware';

import * as userController from '../controllers/user.controller';


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const router: Router = Router();

router.get('/', authUser, userController.getUser);
router.put('/', upload.fields([{ name: 'pictures', maxCount: 1 }, { name: 'backdrop', maxCount: 1 }]), authUser, userController.updateSettings);

router.post('/create', upload.array('pictures'), userController.createUser);
router.post('/login', userController.login);

router.post('/check-unique', userController.checkUnique);

router.get('/username/:username', getUser, userController.getUserByUsername);

router.get('/username/:username/recipes', getUser, userController.getUserRecipes);
router.get('/username/:username/comments', userController.getUserComments);

router.get('/feed', authUser, userController.getFeed);
router.get('/discover', getUser, userController.getDiscover);

router.get('/notifications', authUser, userController.getNotifications);
router.get('/recomms', getUser, userController.getRecomms);

router.post('/save', authUser, userController.saveRecipe);
router.delete('/unsave', authUser, userController.unsaveRecipe);

router.get('/saved', authUser, userController.getSaved);

router.delete('/id/:id', authUser, authAdmin, userController.deleteUser);


export default router;
