const bcrypt = require('bcryptjs');
const {createUser} = require('../models/user.Model');

const crearTrabajador = async (req, res) => {
  const { nombre, usuario, password } = req.body;

  if (!nombre || !usuario || !password) {
    return res.status(400).json({ message: 'Datos incompletos' });
  }

  try {
    const hash = await bcrypt.hash(password, 10);

    await createUser({
        nombre,
        usuario,
        password_hash: hash,
        rol: 'trabajador',
    });
    
    res.status(201).json({ message: 'Trabajador creado exitosamente' });
    } catch (error) {
    res.status(500).json({ message: 'Error al crear el trabajador' });
    }
};

module.exports = { crearTrabajador,};
