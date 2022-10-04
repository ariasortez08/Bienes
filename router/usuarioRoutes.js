import express from 'express';
import {
  formularioLogin,
  formularioRegistro,
  formularioResetPassword,
  registrar,
} from '../controllers/usuarioController.js';

const router = express.Router();

// * router.get('ruta de la pagina', funcion a ejecutar en esa pagina)

router.get('/login', formularioLogin);

router.get('/registro', formularioRegistro);
router.post('/registro', registrar);

router.get('/resetpass', formularioResetPassword);

export default router;
