import express from 'express';
import { admin, agregarUsuarios } from '../controllers/clientesController.js';

const router = express.Router();

router.get('/usuarios', admin);
router.get('/clientes/crear', agregarUsuarios);

export default router;
