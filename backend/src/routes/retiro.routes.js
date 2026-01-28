const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const db = require('../config/database');

router.post('/', authMiddleware, (req, res) => {
  const { producto_id, paciente_id, cantidad, tipo, observacion } = req.body;
  const usuario_id = req.user.id;

  if (!producto_id || !cantidad) {
    return res.status(400).json({ message: 'Datos incompletos' });
  }

  db.serialize(() => {
    // Ver stock
    db.get(
      'SELECT stock_actual FROM productos WHERE id = ?',
      [producto_id],
      (err, producto) => {
        if (!producto || producto.stock_actual < cantidad) {
          return res.status(400).json({ message: 'Stock insuficiente' });
        }

        // Descontar stock
        db.run(
          'UPDATE productos SET stock_actual = stock_actual - ? WHERE id = ?',
          [cantidad, producto_id]
        );

        // Registrar retiro
        db.run(
          `INSERT INTO retiros (producto_id, paciente_id, usuario_id, cantidad, tipo, observacion)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [producto_id, paciente_id, usuario_id, cantidad, tipo, observacion]
        );

        // Inventario paciente
        db.run(
          `INSERT INTO inventario_paciente (paciente_id, producto_id, cantidad)
           VALUES (?, ?, ?)
           ON CONFLICT(paciente_id, producto_id)
           DO UPDATE SET cantidad = cantidad + ?`,
          [paciente_id, producto_id, cantidad, cantidad]
        );

        res.json({ message: 'Retiro registrado correctamente' });
      }
    );
  });
});

module.exports = router