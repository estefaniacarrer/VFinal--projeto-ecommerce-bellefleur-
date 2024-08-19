import { Router } from 'express';
import * as produtoController from '../controllers/produtoController.js';
import verifyToken from '../util/check-token.js';
import { imageUpload } from '../util/image-upload.js';

const router = Router();

//PRODUTO
router.post('/create', verifyToken, imageUpload.array('imagem'), produtoController.create);
router.get('/produtos', produtoController.getAllProdutos); 
router.get('/:id', verifyToken, produtoController.getProdutoById); 
router.get('/', verifyToken, produtoController.getProdutoByName); 
router.delete('/:id', verifyToken, produtoController.removeProdutoById); 
router.patch('/:id', verifyToken, imageUpload.array('imagem'), produtoController.updateProduto);


export default router;