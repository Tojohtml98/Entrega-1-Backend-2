const passport = require('passport');

// Middleware para autenticación usando la estrategia "current"
const authenticateCurrent = passport.authenticate('current', { session: false });

// Middleware genérico para verificar rol
const authorizeRole = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'No autorizado'
      });
    }

    if (req.user.role !== role) {
      return res.status(403).json({
        status: 'error',
        message: 'Acceso denegado. Rol requerido: ' + role
      });
    }

    next();
  };
};

// Atajos para roles específicos
const authorizeAdmin = authorizeRole('admin');
const authorizeUser = authorizeRole('user');

module.exports = {
  authenticateCurrent,
  authorizeRole,
  authorizeAdmin,
  authorizeUser
};

