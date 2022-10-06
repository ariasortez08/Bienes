import { check, validationResult } from 'express-validator';
import Usuario from '../models/Usuario.js';
import { generarId } from '../helpers/tokens.js';

const formularioLogin = (req, res) => {
  res.render('auth/login', {
    pagina: 'Login',
    top: 'Iniciar Sesion',
  });
};

const autenticar = async (req, res) => {
  await check('email')
    .isEmail()
    .withMessage('Por favor introduce un e-mail')
    .run(req);

  await check('password')
    .notEmpty()
    .withMessage('Por favor introduce tu contraseña')
    .run(req);

  let resultado = validationResult(req);

  //Verificar que el resultado este vacio

  if (!resultado.isEmpty()) {
    return res.render('auth/login', {
      pagina: 'Login',

      // Reibimos un arrglo de errores el cual podemos pasarlo al PUG File
      errores: resultado.array(),
    });
  }

  // COMPRUEBO SI EL USUARIO EXISTE

  const { email, password } = req.body;

  const usuario = await Usuario.findOne({ where: { email } });

  if (!usuario) {
    return res.render('auth/login', {
      pagina: 'Login',

      // Reibimos un arrglo de errores el cual podemos pasarlo al PUG File
      errores: [{ msg: 'El usuario no existe' }],
    });
  }

  // COMPROBAR SI EL USUARIO SE CONFIRMO
  if (!usuario.confirmado) {
    return res.render('auth/login', {
      pagina: 'Login',

      // Reibimos un arrglo de errores el cual podemos pasarlo al PUG File
      errores: [{ msg: 'El usuario no esta confirmado' }],
    });
  }
};

export { formularioLogin, autenticar };
