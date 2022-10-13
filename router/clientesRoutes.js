import express from 'express';
import {
  admin,
  agregarUsuarios,
  registrarNuevoUsuario,
} from '../controllers/clientesController.js';

import { agregarColonias } from '../controllers/coloniasController.js';

const router = express.Router();

router.get('/usuarios', admin);
router.get('/clientes/crear', agregarUsuarios);
router.post('/clientes/crear', registrarNuevoUsuario);

//ROUTER DE LAS COLONIAS

router.get('/clientes/agregarColonias', agregarColonias);

export default router;
