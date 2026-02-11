const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const UserDTO = require('../dto/UserDTO');
const userRepository = require('../repositories/UserRepository');
const cartRepository = require('../repositories/CartRepository');
const passwordResetTokenRepository = require('../repositories/PasswordResetTokenRepository');
const { sendPasswordResetEmail } = require('./mail.service');

const JWT_SECRET = process.env.JWT_SECRET || 'tu_secret_key_super_segura_aqui';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';
const RESET_TOKEN_EXPIRES_IN_HOURS = 1;

class AuthService {
  async registerUser(data) {
    const { first_name, last_name, email, age, password, role } = data;

    if (!first_name || !last_name || !email || !age || !password) {
      const error = new Error('Todos los campos son requeridos');
      error.statusCode = 400;
      throw error;
    }

    const existingUser = await userRepository.getByEmail(email);
    if (existingUser) {
      const error = new Error('El email ya está registrado');
      error.statusCode = 400;
      throw error;
    }

    // Crear carrito y usuario usando repositories (DAO + Repository)
    const newCart = await cartRepository.create({ products: [] });

    const newUser = await userRepository.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      age,
      password,
      cart: newCart._id,
      role: role || 'user'
    });

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const userDTO = new UserDTO(newUser);

    return {
      token,
      user: userDTO
    };
  }

  async loginUser(data) {
    const { email, password } = data;

    if (!email || !password) {
      const error = new Error('Email y contraseña son requeridos');
      error.statusCode = 400;
      throw error;
    }

    const user = await userRepository.getByEmail(email);

    if (!user) {
      const error = new Error('Credenciales inválidas');
      error.statusCode = 401;
      throw error;
    }

    const isMatch = user.comparePassword(password);
    if (!isMatch) {
      const error = new Error('Credenciales inválidas');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const userDTO = new UserDTO(user);

    return {
      token,
      user: userDTO
    };
  }

  async getCurrentUser(userId) {
    const user = await userRepository.getById(userId);
    if (!user) {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      throw error;
    }

    return new UserDTO(user);
  }

  async requestPasswordReset(email) {
    if (!email) {
      const error = new Error('El email es requerido');
      error.statusCode = 400;
      throw error;
    }

    const user = await userRepository.getByEmail(email);

    // Por seguridad, no revelamos si el usuario existe o no.
    if (!user) {
      return;
    }

    const tokenValue = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + RESET_TOKEN_EXPIRES_IN_HOURS * 60 * 60 * 1000);

    await passwordResetTokenRepository.create({
      user: user._id,
      token: tokenValue,
      expiresAt,
      used: false
    });

    await sendPasswordResetEmail(user.email, tokenValue);
  }

  async resetPassword(token, newPassword) {
    if (!token || !newPassword) {
      const error = new Error('Token y nueva contraseña son requeridos');
      error.statusCode = 400;
      throw error;
    }

    const resetTokenDoc = await passwordResetTokenRepository.getValidToken(token);

    if (!resetTokenDoc) {
      const error = new Error('Token inválido o expirado');
      error.statusCode = 400;
      throw error;
    }

    const user = await userRepository.getById(resetTokenDoc.user);
    if (!user) {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      throw error;
    }

    // Evitar que el usuario ponga la misma contraseña que antes
    const isSamePassword = user.comparePassword(newPassword);
    if (isSamePassword) {
      const error = new Error('La nueva contraseña no puede ser igual a la anterior');
      error.statusCode = 400;
      throw error;
    }

    user.password = newPassword;
    await user.save();

    resetTokenDoc.used = true;
    await resetTokenDoc.save();
  }
}

module.exports = new AuthService();

