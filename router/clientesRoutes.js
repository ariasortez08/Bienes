import express from 'express';
import { admin } from '../controllers/clientesController.js';

const router = express.Router();

router.get('/usuarios', admin);

export default router;
