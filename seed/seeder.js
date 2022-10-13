import { exit } from 'node:process';
import departamentos from './departamentos.js';
import municipios from './municipios.js';
import Departamentos from '../models/Departamentos.js';
import Municipios from '../models/Municipios.js';
import db from '../config/db.js';

const importarDepartamentos = async () => {
  try {
    // Autenticamos
    await db.authenticate();

    //Generar las columnas
    await db.sync();
    //Insertamos los datos
    await Promise.all([
      Departamentos.bulkCreate(departamentos),
      Municipios.bulkCreate(municipios),
    ]);
    console.log('Departamentos Agregados Correctamente');
    exit();
  } catch (error) {
    console.log(error);
    exit(1);
  }
};

if (process.argv[2] === '-i') {
  importarDepartamentos();
}
