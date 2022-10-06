import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const emailRegistro = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { nombre, email, token } = datos;

  // ENVIAR EL CORREO

  await transport.sendMail({
    from: 'Bienesraices.com',
    to: email,
    subject: 'Confirmacion de Registro',
    text: 'Por favor confirma tu cuenta',
    html: `<p> Hola ${nombre},

    Gracias por subscribirte a Bienes Raices.</p>

    <p>Por favor confirma tu correo con el siguiente enlace:

    <a href="${process.env.BACKEND_URL}:${
      process.env.PORT ?? 3000
    }/auth/confirmar/${token}">Confirmar Cuenta</a></p>

    <p> Si no creaste la cuenta, ignora el mensaje </p>
    
    `,
  });
};

const emailOlvidePassword = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { nombre, email, token } = datos;

  // ENVIAR EL CORREO

  await transport.sendMail({
    from: 'Bienesraices.com',
    to: email,
    subject: 'Restablecer Contrasena',
    text: 'Sigue las instrucciones para cambiar la contrasena',
    html: `<p> Hola ${nombre}, </p>

   <p> Has solicitado un cambio de contrasena.</p>

    <p>Por favor haz click en el siguiente enlace para cambiar tu contrasena:

    <a href="${process.env.BACKEND_URL}:${
      process.env.PORT ?? 3000
    }/auth/resetpass/${token}">Restablecer Contrasena</a></p>

    <p> Si no solicitaste el cambio, ignora el mensaje </p>
    
    `,
  });
};

export { emailRegistro, emailOlvidePassword };
