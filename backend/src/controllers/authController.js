const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { findByUsuario } = require('../models/userModel');

const login = async (req, res) => {
  const { usuario, password } = req.body;

  if(!usuario || !password) {
    return res.status(400).json({ message: 'Datos incompletos' });
  }

  try {
    const user = await findByUsuario(usuario);
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
  
  const token = jwt.sign(
    { id: user.id, rol: user.rol },
    process.env.JWT_SECRET || 'secreto123',
    { expiresIn: '8h' }
  );

  res.json({
    token,
    usuario: {
      id: user.id,
      nombre: user.nombre,
      rol: user.rol,
    },
  });
  } catch (error) {
    res.status(500).json({ message: 'Error en el login' });
  }
};

module.exports = { login };