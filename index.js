import express from 'express';
import usuarioRoutes from './router/usuarioRoutes.js';

// ? Creamos la app
const app = express();

// * INICIAMOS PUG

app.set('view engine', 'pug');
app.set('views', './views');

// * CARPETAS PUBLICAS

// app.set(express.static('public'));

// ? Recordar

app.use(express.static('public'));

//Routing

app.use('/auth', usuarioRoutes);

//Definimos el puerto

const port = 4000;

app.listen(port, () => {
  console.log(`El servidor esta en el puerto ${port}`);
});
