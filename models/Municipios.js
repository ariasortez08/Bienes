import { DataTypes } from 'sequelize';
import db from '../config/db.js';

// AQUI CREAMOS EL MODEL DE LA TABLA EN LA BD

const Municipios = db.define('municipios', {
  deptN: {
    type: DataTypes.INTEGER(3),
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});

export default Municipios;
