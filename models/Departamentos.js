import { DataTypes } from 'sequelize';
import db from '../config/db.js';

// AQUI CREAMOS EL MODEL DE LA TABLA EN LA BD

const Departamentos = db.define('departamentos', {
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});

export default Departamentos;
