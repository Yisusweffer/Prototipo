const express = require('express');
const router = express.Router();
const db = require('../config/database');

const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');


router.post(
  '/',
  auth,
  role(['trabajador', 'supervisor']),
  (req, res) => {
    const {
      producto_id,
      paciente_id,
      cantidad,
      tipo,
      observacion
    } = req.body;

    const usuario_id = req.user.id;

    if (!producto_id || !paciente_id || !cantidad) {
      return res.status(400).json({ message: 'Datos incompletos' });
    }


    db.get(
      `SELECT stock_actual FROM productos WHERE id = ?`,
      [producto_id],
      (err, producto) => {
        if (err || !producto) {
          return res.status(404).json({ message: 'Producto no encontrado' });
        }

        if (producto.stock_actual < cantidad) {
          return res.status(400).json({ message: 'Stock insuficiente' });
        }


        db.run(
          `UPDATE productos SET stock_actual = stock_actual - ? WHERE id = ?`,
          [cantidad, producto_id],
          function (err) {
            if (err) {
              return res.status(500).json({ message: 'Error actualizando stock' });
            }

            db.run(
              `INSERT INTO retiros 
              (producto_id, paciente_id, usuario_id, cantidad, tipo, observacion)
              VALUES (?, ?, ?, ?, ?, ?)`,
              [producto_id, paciente_id, usuario_id, cantidad, tipo, observacion],
              function (err) {
                if (err) {
                  return res.status(500).json({ message: 'Error registrando retiro' });
                }

                db.run(
                  `
                  INSERT INTO inventario_paciente (paciente_id, producto_id, cantidad)
                  VALUES (?, ?, ?)
                  ON CONFLICT(paciente_id, producto_id)
                  DO UPDATE SET cantidad = cantidad + ?
                  `,
                  [paciente_id, producto_id, cantidad, cantidad],
                  err => {
                    if (err) {
                      return res.status(500).json({
                        message: 'Error actualizando inventario del paciente'
                      });
                    }

                    res.json({
                      message: 'Retiro realizado correctamente'
                    });
                  }
                );
              }
            );
          }
        );
      }
    );
  }
);

module.exports = router;