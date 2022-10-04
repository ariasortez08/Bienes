import { check, validationResult } from 'express-validator';
import Usuario from '../models/Usuario.js';

const formularioLogin = (req, res) => {
  res.render('auth/login', {
    pagina: 'Login',
    top: 'Iniciar Sesion',
  });
};

const formularioRegistro = (req, res) => {
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
    });
  }

  // res.json(resultado.array());
  const usuario = await Usuario.create(req.body);

  res.json(usuario);
};

const formularioResetPassword = (req, res) => {
  // ? res.render('carpetadeview/nombrearchivopug')
  res.render('auth/forgotpass', {
    pagina: 'Recuperar Contraseña',
    top: 'Cambiar Contraseña',
  });
};
export {
  formularioLogin,
  registrar,
  formularioRegistro,
  formularioResetPassword,
};
