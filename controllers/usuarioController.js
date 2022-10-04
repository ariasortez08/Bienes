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

export { formularioLogin, formularioRegistro };
