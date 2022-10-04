import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const db = new Sequelize(
  process.env.BD_NOMBRE,
  process.env.BD_USER,
  process.env.BD_PASS,
  {
    host: process.env.BD_HOST,
    port: process.env.BD_PORT,
    dialect: 'mysql',
    define: {
      timestamps: true,
    },
    pool: {
      //Maximo de conexiones a mantener
      max: 5,
      //Minimo de conexiones
      min: 0,
      // Esto quiere decir 30 segundos para intentar conectarse sin marcar error
      acquire: 30000,
      // Si no hay visitas o movimiento se finaliza la conexion
      idle: 10000,
    },

    operatorAliases: false,
  }
);

export default db;
