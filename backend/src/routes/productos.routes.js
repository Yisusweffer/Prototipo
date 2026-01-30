const express = require('express');
const router = express.Router();
const db = require('../config/database');

const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

const auth = authMiddleware;
const role = roleMiddleware;


router.post(
  '/',
  auth,
  role(['supervisor']),
  (req, res) => {
    const {
      nombre,
      medida,
      lote,
      fecha_vencimiento,
      stock_actual,
      stock_minimo,
      ubicacion
    } = req.body;

    if (!nombre) {
      return res.status(400).json({ message: 'El nombre es obligatorio' });
    }

    const sql = `
      INSERT INTO productos
      (nombre, medida, lote, fecha_vencimiento, stock_actual, stock_minimo, ubicacion)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(
      sql,
      [
        nombre,
        medida || null,
        lote || null,
        fecha_vencimiento || null,
        stock_actual || 0,
        stock_minimo || 0,
        ubicacion || null
      ],
      function (err) {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Error al crear producto' });
        }

        res.json({
          message: 'Producto creado correctamente',
          id: this.lastID
        });
      }
    );
  }
);


router.get(
  '/',
  auth,
  (req, res) => {
    const sql = `SELECT * FROM productos`;

    db.all(sql, [], (err, rows) => {
      if (err) {
        return res.status(500).json({ message: 'Error al obtener productos' });
      }
      res.json(rows);
    });
  }
);


router.put(
  '/stock/:id',
  auth,
  role(['supervisor']),
  (req, res) => {
    const { cantidad } = req.body;
    const { id } = req.params;

    if (!cantidad || cantidad <= 0) {
      return res
        .status(400)
        .json({ message: 'Cantidad inválida. Debe ser mayor a 0' });
    }

    const sql = `
      UPDATE productos
      SET stock_actual = stock_actual + ?
      WHERE id = ?
    `;

    db.run(sql, [cantidad, id], function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error al actualizar stock' });
      }

      if (this.changes === 0) {
        return res
          .status(404)
          .json({ message: 'Producto no encontrado' });
      }

      res.json({
        message: 'Stock actualizado correctamente'
      });
    });
  }
);

module.exports = router;