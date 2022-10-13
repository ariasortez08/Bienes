import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import db from '../config/db.js';

const Clientes = db.define(
  'usuarios',
  {
    //Creamos columnas de BD
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tel: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    dni: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    colonia: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async function (usuarioNuevo) {
        const salt = await bcrypt.genSalt(10);
        usuarioNuevo.password = await bcrypt.hash(usuarioNuevo.password, salt);
      },
    },
  }
);

export default Clientes;
