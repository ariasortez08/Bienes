import { validationResult } from 'express-validator';
import { Colonias, Departamentos, Municipios } from '../models/index.js';

const [dep, mun] = await Promise.all([
  Departamentos.findAll(),
  Municipios.findAll(),
]);
const agregarColoniasNuevas = async (req, res) => {
  res.render('clientes/agregarColonias', {
    pagina: 'Panel Principal',
    top: 'Panel Administrativos',
    barra: true,
    dep,
    mun,
  });
};

const guardarColoniaNueva = async (req, res) => {
  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    res.render('clientes/agregarColonias', {
      pagina: 'Panel Principal',
      top: 'Panel Administrativos',
      barra: true,
      dep,
      mun,
      errores: resultado.array(),
    });
  }

  // CREAMOS UNA NUEVO COLONIA''
  const { nombre, municipio, departamento } = req.body;

  try {
    await Colonias.create({
      nombre,
      municipio,
      departamento,
    });
  } catch (error) {
    console.log(error);
  }
};

export { agregarColoniasNuevas, guardarColoniaNueva };
