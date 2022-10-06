import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import Usuario from '../models/Usuario.js';
import { generarId } from '../helpers/tokens.js';
import { emailRegistro, emailOlvidePassword } from '../helpers/emails.js';

const formularioLogin = (req, res) => {
  res.render('auth/login', {
    pagina: 'Login',
    top: 'Iniciar Sesion',
  });
};

const formularioRegistro = (req, res) => {
  console.log('aqui toy');
  res.render('auth/registro', {
    pagina: 'Registro',
    top: 'Registrar Usuario',
  });
};

const registrar = async (req, res) => {
  // * ! SIEMPRE QUE VAMOS A LEER SE UTILIZA EL BODY *

  // ! VAIDACION

  await check('nombre')
    .notEmpty()
    .withMessage('Nombre no puede estar vacio')
    .run(req);

  await check('email')
    .isEmail()
    .withMessage('Por favor introduce un e-mail')
    .run(req);

  await check('password')
    .isLength({ min: 6 })
    .withMessage('El password debe ser de al menos 6 caracteres')
    .run(req);

  await check('rep_pass')
    .equals(req.body.password)
    .withMessage('Las contrasenas no son iguales')
    .run(req);

  // ! DEVUELVE UN ARRAY CON LOS ERRORES
  let resultado = validationResult(req);

  //Verificar que el resultado este vacio

  if (!resultado.isEmpty()) {
    return res.render('auth/registro', {
      pagina: 'Registro',

      // Reibimos un arrglo de errores el cual podemos pasarlo al PUG File
      errores: resultado.array(),

      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }

  // ! VERIFICAR USUARIO REPETIDO

  // Extraer los datos

  const { nombre, email, password } = req.body;

  const existeUsuario = await Usuario.findOne({
    where: { email },
  });

  if (existeUsuario) {
    return res.render('auth/registro', {
      pagina: 'Registro',

      // Reibimos un arrglo de errores el cual podemos pasarlo al PUG File
      errores: [{ msg: 'El usuario ya esta registrado' }],

      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }

  console.log(existeUsuario);

  // ? ALMACENAR UN USUARIO

  const usuario = await Usuario.create({
    nombre,
    email,
    password,
    token: generarId(),
  });

  // ENVIA CORROE DE CONFIRMACION

  // const registro = { nombre, email } = usuario;

  emailRegistro({
    nombre: usuario.nombre,
    email: usuario.email,
    token: usuario.token,
  });

  // ! Mostrar mensaje de confirmacion

  res.render('templates/mensaje', {
    pagina: 'Confirmacion',

    mensaje: 'Hemos enviado un mensaje de confirmacion, haz click en el enlace',
    top: 'Cuenta Creada Correctamente',
  });
};

// Funcion que comprueba una cuenta

const comprobar = async (req, res) => {
  const { token } = req.params;

  // ? Verificamos si el token es valido
  const usuario = await Usuario.findOne({ where: { token } });

  if (!usuario) {
    return res.render('auth/confirmar-cuenta', {
      pagina: 'Error',
      mensaje: 'Hubo un error al confirmar tu cuenta',
      error: true,
      top: 'Error al confirmar tu cuenta',
    });
  }

  // Confirmar la ceunta

  usuario.token = null;

  usuario.confirmado = true;

  await usuario.save();

  res.render('auth/confirmar-cuenta', {
    pagina: 'Confirmation',
    mensaje: 'La cuenta se confirmo correctamente',
    top: 'Bienvenido a tu nueva cuenta',
  });
};
const formularioResetPassword = (req, res) => {
  // ? res.render('carpetadeview/nombrearchivopug')
  res.render('auth/forgotpass', {
    pagina: 'Recuperar Contraseña',
    top: 'Cambiar Contraseña',
  });
};

// FUNCION  POST
const resetPassword = async (req, res) => {
  await check('email')
    .isEmail()
    .withMessage('Por favor introduce un e-mail')
    .run(req);

  // ! DEVUELVE UN ARRAY CON LOS ERRORES
  let resultado = validationResult(req);

  //Verificar que el resultado este vacio

  if (!resultado.isEmpty()) {
    return res.render('auth/forgotpass', {
      pagina: 'Recuperar Contraseña',
      top: 'Cambiar Contraseña',

      // Reibimos un arrglo de errores el cual podemos pasarlo al PUG File
      errores: resultado.array(),
    });
  }

  // ! VERIFICAR SI EL USUARIO EXISTE

  // REVISAMOS LO QUE SE INGRESO EN EL FORMULARIO

  const { email } = req.body;

  const usuario = await Usuario.findOne({ where: { email } });

  if (!usuario) {
    return res.render('auth/forgotpass', {
      pagina: 'Recuperar Contraseña',
      top: 'Cambiar Contraseña',
      errores: [{ msg: 'El usuario no existe' }],
      // Reibimos un arrglo de errores el cual podemos pasarlo al PUG File
    });
  }

  // GENERAR TOKEN NUEVO

  usuario.token = generarId();

  await usuario.save();

  // Enviar un email

  emailOlvidePassword({
    email: usuario.email,
    nombre: usuario.nombre,
    token: usuario.token,
  });

  //Renderizar el mensaje

  res.render('templates/mensaje', {
    pagina: 'Restablece tu contrasena',
    mensaje: 'Hemos enviado un correo con las instrucciones',
  });
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;

  const usuario = await Usuario.findOne({ where: { token } });

  if (!usuario) {
    return res.render('auth/confirmar-cuenta', {
      pagina: 'Reestablece tu contrasena',
      mensaje: 'Hubo un error al validar tu informacion',
      error: true,
      top: 'Error al confirmar tu cuenta',
    });
  }

  // MOSTRAR FORMULARIO PARA CAMBIAR PASSWORD

  res.render('auth/reset-password', {
    pagina: 'Restablece tu contrasena',
  });
};

const nuevoPassword = async (req, res) => {
  // Validar el password
  await check('password')
    .isLength({ min: 6 })
    .withMessage('El password debe ser de al menos 6 caracteres')
    .run(req);

  // ! DEVUELVE UN ARRAY CON LOS ERRORES
  let resultado = validationResult(req);

  //Verificar que el resultado este vacio

  if (!resultado.isEmpty()) {
    return res.render('auth/reset-password', {
      pagina: 'Restablece tu contraseña',

      // Reibimos un arrglo de errores el cual podemos pasarlo al PUG File
      errores: resultado.array(),
    });
  }

  //Identificar quien hace el cambio

  const { token } = req.params;
  const { password } = req.body;

  const usuario = await Usuario.findOne({ where: { token } });

  //Hashear el nuevo password
  const salt = await bcrypt.genSalt(10);
  usuario.password = await bcrypt.hash(password, salt);

  usuario.token = null;

  await usuario.save();

  res.render('auth/confirmar-cuenta', {
    pagina: 'Password Reestablecido',
    mensaje: 'Se ha cambiado la contraseña correctamente',
  });
};
export {
  formularioLogin,
  registrar,
  formularioRegistro,
  comprobar,
  resetPassword,
  formularioResetPassword,
  comprobarToken,
  nuevoPassword,
};
