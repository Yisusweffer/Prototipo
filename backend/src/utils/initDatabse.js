const fs = require('fs');
const path = require('path');
const db = require('../config/database');

const sql = fs.readFileSync(
  path.resolve(__dirname, '../../database/init.sql'),
  'utf8'
);

db.exec(sql, err => {
  if (err) {
    console.error('Error creando tablas', err);
  } else {
    console.log('Tablas creadas correctamente');
  }
});
