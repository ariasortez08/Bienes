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
  // * ! SIEMPRE QUE VAMOPS A LEER SE UTILIZA EL BODY *
  /*  console.log('Registrando');

  console.log(req.body); */

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
