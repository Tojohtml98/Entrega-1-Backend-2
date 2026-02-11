const authService = require('../services/auth.service');

// Registrar nuevo usuario
const register = async (req, res) => {
  try {
    const result = await authService.registerUser(req.body);

    res.status(201).json({
      status: 'success',
      message: 'Usuario registrado correctamente',
      token: result.token,
      user: result.user
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(error.statusCode || 500).json({
      status: 'error',
      message: error.message || 'Error al registrar usuario'
    });
  }
};

// Login de usuario
const login = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);

    res.json({
      status: 'success',
      message: 'Login exitoso',
      token: result.token,
      user: result.user
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(error.statusCode || 500).json({
      status: 'error',
      message: error.message || 'Error al iniciar sesión'
    });
  }
};

// Obtener usuario actual (requiere autenticación)
const getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'No autorizado'
      });
    }

    const userDTO = await authService.getCurrentUser(req.user._id);

    res.json({
      status: 'success',
      user: userDTO
    });
  } catch (error) {
    console.error('Error al obtener usuario actual:', error);
    res.status(error.statusCode || 500).json({
      status: 'error',
      message: error.message || 'Error al obtener información del usuario'
    });
  }
};

// Solicitar recuperación de contraseña
const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    await authService.requestPasswordReset(email);

    res.json({
      status: 'success',
      message: 'Si el email existe en el sistema, se enviará un enlace para restablecer la contraseña'
    });
  } catch (error) {
    console.error('Error al solicitar recuperación de contraseña:', error);
    res.status(error.statusCode || 500).json({
      status: 'error',
      message: error.message || 'Error al solicitar recuperación de contraseña'
    });
  }
};

// Restablecer contraseña
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    await authService.resetPassword(token, newPassword);

    res.json({
      status: 'success',
      message: 'Contraseña restablecida correctamente'
    });
  } catch (error) {
    console.error('Error al restablecer contraseña:', error);
    res.status(error.statusCode || 500).json({
      status: 'error',
      message: error.message || 'Error al restablecer contraseña'
    });
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  requestPasswordReset,
  resetPassword
};

