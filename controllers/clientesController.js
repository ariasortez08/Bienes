import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import Clientes from '../models/Clientes.js';
import Usuario from '../models/Usuario.js';

const admin = (req, res) => {
  res.render('clientes/admin', {
    pagina: 'Panel Principal',
    top: 'Panel Administrativos',
    barra: true,
  });
};

// FORMULARIO PARA AGREGAR USUARIOS
let pituitaria = ['La Trinidad', 'La Lima'];
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
    .isEmail()
    .withMessage('Por favor ingrese un correo electrónico valido')
    .run(req);
  await check('tel')
    .isNumeric()
    .withMessage('Por favor ingrese solamente números para el telefono')
    .run(req);
  await check('dni')
    .isNumeric()
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
    .withMessage('Ingrese una dirección')
    .run(req);

  let resultado = validationResult(req);

  // DESTRUCTURACION DE DATOS

  const { nombre, email, tel, dni, direccion, rol, password, colonia } =
    req.body;

  //VERIFICAR USUARIOS DUPLICADOS

  const existeUsuario = await Clientes.findOne({
    where: { email },
  });
  const existeAdmin = await Usuario.findOne({
    where: { email },
  });

  if (existeUsuario || existeAdmin) {
    return res.render('clientes/crear', {
      pagina: 'Agregar Usuarios',
      top: 'Agregar Nuevo Usuario',
      barra: true,
      colonias: pituitaria,
      roles: ['administrador', 'usuario', 'guardia'],
      errores: [{ msg: 'El usuario ya existe' }],
      usuarioNuevo: {
        nombre,
        email,
        tel,
        dni,
        direccion,
      },
    });
  }

  //VERIFICAMOS QUE EL RESULTADO DE ERRORES ESTE VACIO

  if (!resultado.isEmpty()) {
    return res.render('clientes/crear', {
      pagina: 'Agregar Usuarios',
      top: 'Agregar Nuevo Usuario',
      barra: true,
      colonias: pituitaria,
      roles: ['administrador', 'usuario', 'guardia'],
      errores: resultado.array(),
      usuarioNuevo: {
        nombre,
        email,
        tel,
        dni,
        direccion,
      },
    });
  }

  //* REGISTRAR NUEVO USUARIO

  await Clientes.create({
    nombre,
    email,
    password,
    dni,
    tel,
    rol,
    colonia,
    direccion,
  });

  // res.json(nuevo);
};

export { admin, agregarUsuarios, registrarNuevoUsuario };
