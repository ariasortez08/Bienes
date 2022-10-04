import express from 'express';
import {
  formularioLogin,
  formularioRegistro,
  formularioResetPassword,
} from '../controllers/usuarioController.js';

const router = express.Router();

// * router.get('ruta de la pagina', funcion a ejecutar en esa pagina)

router.get('/login', formularioLogin);

router.get('/registro', formularioRegistro);
router.get('/resetpass', formularioResetPassword);

export default router;
