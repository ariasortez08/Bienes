const admin = (req, res) => {
  res.render('clientes/admin', {
    pagina: 'Panel Principal',
    top: 'Panel Administrativos',
    barra: true,
  });
};

export { admin };
