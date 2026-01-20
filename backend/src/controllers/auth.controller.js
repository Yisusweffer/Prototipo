const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

exports.login = (req, res) => {
    const { usuario, password } = req.body;

    const sql = 'SELECT * FROM usuarios WHERE usuario = ? AND activo = 1';

    db.get(sql, [usuario], async (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Error en el servidor' });
        }

        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
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

        res.json({
            token,
            usuario: {
                id: user.id,
                nombre: user.nombre,
                rol: user.rol,
            },
        });
    })
};