import { Router } from 'express';
import * as userController from '../controllers/userController.js';
import * as sacolaController from '../controllers/sacolaController.js';  
import * as favoritosController from '../controllers/favoritosController.js';
import verifyToken from '../util/check-token.js';

const router = Router();

//USUARIO
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/checkuser', userController.checkUser);
router.get('/:id', userController.getUserById);

// SACOLA
router.post('/sacola/add', verifyToken, sacolaController.addItemSacola);
router.get('/sacola', verifyToken, sacolaController.getAllUserSacolaItems);
router.delete('/sacola/:produtoId', verifyToken, sacolaController.removeItemSacola);

// FAVORITOS
router.post('/favoritos/add', verifyToken, favoritosController.addItemFavoritos);
router.get('/favoritos', verifyToken, favoritosController.getAllUserFavoritos);
router.delete('/favoritos/:produtoId', verifyToken, favoritosController.removeItemFavoritos);

export default router;