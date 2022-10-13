import Clientes from './Clientes.js';
import Usuario from './Usuario.js';
import Departamentos from './Departamentos.js';
import Municipios from './Municipios.js';
import Colonias from './Colonias.js';

// DEFINIMOS LAS RELACIONES

export { Clientes, Usuario, Departamentos, Municipios, Colonias };

/* UN ADMIN PERTENCE A UNA COLONIA */

Usuario.belongsTo(Colonias, { foreignKey: 'adminID' });

// ? Colonia tiene muchos clientes

Colonias.hasMany(Clientes, { foreignKey: 'coloniaID' });
