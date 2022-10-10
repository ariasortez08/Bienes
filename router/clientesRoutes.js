import express from 'express';
import {
  admin,
  agregarUsuarios,
  registrarNuevoUsuario,
} from '../controllers/clientesController.js';

const router = express.Router();

router.get('/usuarios', admin);
router.get('/clientes/crear', agregarUsuarios);
router.post('/clientes/crear', registrarNuevoUsuario);

export default router;
