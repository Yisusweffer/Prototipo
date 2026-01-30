const bcrypt = require('bcryptjs');
const {createUser} = require('../models/user.Model');

(async () => {
  try {
  const passwordHash = await bcrypt.hash('123', 10);

  await createUser({
    nombre: 'Administrador',
    usuario: 'admin',
    password_hash: passwordHash,
    rol: 'supervisor',
  });

  console.log('Usuario administrador creado correctamente');
  process.exit(0);
} catch (error) {
  console.error('Error creando usuario administrador', error);
  process.exit(1);
}
})();