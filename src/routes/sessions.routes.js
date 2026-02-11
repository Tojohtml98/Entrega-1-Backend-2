const express = require('express');
const router = express.Router();
const sessionsController = require('../controllers/sessions.controller');
const { authenticateCurrent } = require('../middleware/auth.middleware');

// Ruta de registro
router.post('/register', sessionsController.register);

// Ruta de login
router.post('/login', sessionsController.login);

// Ruta para obtener usuario actual (requiere autenticación con estrategia "current")
router.get(
  '/current',
  authenticateCurrent,
  sessionsController.getCurrentUser
);

// Recuperación de contraseña: solicitar email para enviar enlace
router.post('/forgot-password', sessionsController.requestPasswordReset);

// Recuperación de contraseña: restablecer contraseña usando token
router.post('/reset-password', sessionsController.resetPassword);

module.exports = router;

