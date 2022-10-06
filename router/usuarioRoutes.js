import express from 'express';
import {
  formularioLogin,
  formularioRegistro,
  formularioResetPassword,
  resetPassword,
  registrar,
  comprobar,
  comprobarToken,
  nuevoPassword,
} from '../controllers/usuarioController.js';

const router = express.Router();

// * router.get('ruta de la pagina', funcion a ejecutar en esa pagina)

router.get('/login', formularioLogin);

router.get('/registro', formularioRegistro);
router.post('/registro', registrar);

router.get('/resetpass', formularioResetPassword);
router.post('/resetpass', resetPassword);

// Almacenar nueva password

router.get('/resetpass/:token', comprobarToken);
router.post('/resetpass/:token', nuevoPassword);

router.get('/confirmar/:token', comprobar);

export default router;
