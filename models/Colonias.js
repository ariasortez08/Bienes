import { DataTypes } from 'sequelize';
import db from '../config/db.js';

// AQUI CREAMOS EL MODEL DE LA TABLA EN LA BD

const Colonias = db.define('colonias', {
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  municipio: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  departamento: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});

export default Colonias;
