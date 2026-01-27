const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userModel = require('../models/user.Model');
const authMiddleware = require('../middlewares/auth.Middleware');
const roleMiddleware = require('../middlewares/role.middleware');

const auth = authMiddleware;
const role = roleMiddleware;

router.post(
    '/',
    auth,
    role(['admin']),
    async (req, res) => {
        const { nombre, usuario, password, rol} = req.body;

        const password_hash = await bcrypt.hash(password, 10);

        await userModel.create({
            nombre,
            usuario,
            password_hash,
            rol
        });

        res.json({ message: 'Usuario creado correctamente' });
    }
);

module.exports = router;