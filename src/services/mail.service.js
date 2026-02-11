const nodemailer = require('nodemailer');

// Configuración básica del transporter usando variables de entorno
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || 'smtp.gmail.com',
  port: Number(process.env.MAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

// Verificamos la configuración al iniciar (solo logueamos error si falla)
transporter.verify((error) => {
  if (error) {
    console.error('Error al configurar el servicio de correo:', error.message);
  } else {
    console.log('Servicio de correo listo para enviar emails');
  }
});

const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';

const sendPasswordResetEmail = async (toEmail, token) => {
  const resetLink = `${BASE_URL}/reset-password?token=${token}`;

  const htmlContent = `
    <h2>Recuperación de contraseña</h2>
    <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente botón para continuar:</p>
    <p>
      <a href="${resetLink}" style="
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: #ffffff;
        text-decoration: none;
        border-radius: 4px;
      ">
        Restablecer contraseña
      </a>
    </p>
    <p>Si el botón no funciona, copia y pega este enlace en tu navegador:</p>
    <p>${resetLink}</p>
    <p>Este enlace expirará en 1 hora.</p>
  `;

  const mailOptions = {
    from: process.env.MAIL_FROM || process.env.MAIL_USER,
    to: toEmail,
    subject: 'Recuperación de contraseña - Ecommerce',
    html: htmlContent
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendPasswordResetEmail
};

