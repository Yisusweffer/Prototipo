const db = require('../config/database');

const createUser = (user) => {
  const { nombre, usuario, password_hash, rol } = user;

  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO usuarios (nombre, usuario, password_hash, rol)
      VALUES (?, ?, ?, ?)
    `;

    db.run(sql, [nombre, usuario, password_hash, rol], function (err) {
      if (err) reject(err);
      else resolve(this.lastID);
    });
  });
};

const findByUsuario = (usuario) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * FROM usuarios
      WHERE usuario = ? AND activo = 1
    `;

    db.get(sql, [usuario], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

module.exports = {
  createUser,
  findByUsuario,
};