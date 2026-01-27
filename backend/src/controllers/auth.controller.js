const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.Model');

exports.login = async (req, res) => {
  const { usuario, password } = req.body;

  console.log('Login recibido', usuario);

  try {
    const user = await userModel.findByUsername(usuario);

    if (!user) {
      return res.status(401).json({ message: 'Usuario incorrecto' });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: user.id, rol: user.rol }, 
      process.env.JWT_SECRET, 
      { expiresIn: '8h' }
    );
    
    res.json({ token,
      usuario: {
        id: user.id,
        nombre: user.nombre,
        rol: user.rol
      }
    });

  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};