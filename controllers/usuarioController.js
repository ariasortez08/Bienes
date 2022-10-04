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

const formularioResetPassword = (req, res) => {
  // ? res.render('carpetadeview/nombrearchivopug')
  res.render('auth/forgotpass', {
    pagina: 'Recuperar Contraseña',
    top: 'Cambiar Contraseña',
  });
};
export { formularioLogin, formularioRegistro, formularioResetPassword };
