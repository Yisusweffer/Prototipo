const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const userModel = require('../models/user.Model');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

router.post(
  '/',
  authMiddleware,
  roleMiddleware(['supervisor']),
  async (req, res) => {
    try {
      const { nombre, usuario, password, rol } = req.body;

      const password_hash = await bcrypt.hash(password, 10);

      await userModel.createUser({
        nombre,
        usuario,
        password_hash,
        rol
      });

      res.json({ message: 'Usuario creado correctamente' });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear usuario' });
    }
  }
);

module.exports = router;