import express from 'express';
import { body } from 'express-validator';
import {
  admin,
  agregarUsuarios,
  registrarNuevoUsuario,
} from '../controllers/clientesController.js';

import {
  guardarColoniaNueva,
  agregarColoniasNuevas,
} from '../controllers/coloniasController.js';

const router = express.Router();

router.get('/usuarios', admin);
router.get('/clientes/crear', agregarUsuarios);
router.post('/clientes/crear', registrarNuevoUsuario);

//ROUTER DE LAS COLONIAS

router.get('/clientes/agregarColonias', agregarColoniasNuevas);
router.post(
  '/clientes/agregarColonias',
  body('departamento').isNumeric().withMessage('Selecciona un departamento'),
  body('municipio').isNumeric().withMessage('Selecciona un municipio'),
  body('colonia').isEmpty().withMessage('Escribe una colonia'),
  guardarColoniaNueva
);

export default router;
