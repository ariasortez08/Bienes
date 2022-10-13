import { check, validationResult } from 'express-validator';
import Colonias from '../models/Colonias.js';
import Departamentos from '../models/Departamentos.js';
import Municipios from '../models/Municipios.js';

const agregarColoniasNuevas = (req, res) => {
  res.render('clientes/agregarColonias', {
    pagina: 'Panel Principal',
    top: 'Panel Administrativos',
    barra: true,
  });
};

const agregarColonias = async (req, res) => {
  const [dep, mun] = await Promise.all([
    Departamentos.findAll(),
    Municipios.findAll(),
  ]);

  res.render('clientes/agregarColonias', {
    pagina: 'Panel Principal',
    top: 'Panel Administrativos',
    barra: true,
    dep,
    mun,
  });
};

export { agregarColonias, agregarColoniasNuevas };
