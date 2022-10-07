const admin = (req, res) => {
  res.render('clientes/admin', {
    pagina: 'Panel Principal',
    top: 'Panel Administrativos',
    barra: true,
  });
};

// FORMULARIO PARA AGREGAR USUARIOS
let pituitaria = ['col1', 'col2', 'col3', 'col 4', 'col 5'];
const agregarUsuarios = (req, res) => {
  res.render('clientes/crear', {
    pagina: 'Agregar Usuarios',
    top: 'Agregar Nuevo Usuario',
    barra: true,
    colonias: pituitaria,
  });
};

console.log(typeof pituitaria);

export { admin, agregarUsuarios };
