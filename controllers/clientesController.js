import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import Clientes from '../models/Clientes.js';
import Swal from 'sweetalert2';

const admin = (req, res) => {
  res.render('clientes/admin', {
    pagina: 'Panel Principal',
    top: 'Panel Administrativos',
    barra: true,
  });
};

// FORMULARIO PARA AGREGAR USUARIOS
let pituitaria = ['La Trinidad'];
const agregarUsuarios = (req, res) => {
  res.render('clientes/crear', {
    pagina: 'Agregar Usuarios',
    top: 'Agregar Nuevo Usuario',
    barra: true,
    colonias: pituitaria,
    roles: ['administrador', 'usuario', 'guardia'],
  });
};

const registrarNuevoUsuario = async (req, res) => {
  // ! VALIDACION

  await check('nombre')
    .notEmpty()
    .withMessage('El nombre no puede ir vacio')
    .run(req);
  await check('email')
    .notEmpty()
    .withMessage('Por favor ingrese un correo electrónico valido')
    .isEmail()
    .run(req);
  await check('tel')
    .notEmpty()
    .withMessage('Por favor ingrese solamente números para el telefono')
    .run(req);
  await check('dni')
    .notEmpty()
    .withMessage('Por favor ingrese solamente números para el DNI')
    .run(req);
  await check('colonia')
    .notEmpty()
    .withMessage('Seleccione una colonia')
    .run(req);
  await check('rol')
    .notEmpty()
    .withMessage('Seleccione un rol para el usuario')
    .run(req);
  await check('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe ser de al menos 6 caracteres')
    .run(req);
  await check('rep_pass')
    .equals(req.body.password)
    .withMessage('Las contraseñas no son iguales')
    .run(req);
  await check('direccion')
    .notEmpty()
    .withMessage('Seleccione un rol para el usuario')
    .run(req);

  let resultado = validationResult(req);

  //VERIFICAMOS QUE EL RESULTADO DE ERRORES ESTE VACIO

  if (!resultado.isEmpty()) {
    console.log(resultado);

    return res.render('clientes/crear', {
      pagina: 'Agregar Usuarios',
      top: 'Agregar Nuevo Usuario',
      barra: true,
      colonias: pituitaria,
      roles: ['administrador', 'usuario', 'guardia'],
      errores: resultado.array(),
    });
  }

  // res.json(resultado.array());

  //* REGISTRAR NUEVO USUARIO

  const nuevo = await Clientes.create(req.body);

  res.json(nuevo);
};

export { admin, agregarUsuarios, registrarNuevoUsuario };
