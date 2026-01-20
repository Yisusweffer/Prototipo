const express = require('express');
const auth = require('../middleware/authMiddleware');
const allowRoles = require('../middleware/roleMiddleware');
const { crearTrabajador } = require('../controllers/userController');

const router = express.Router();

router.post(
    '/trabajador',
    auth,
    allowRoles('admin'),
    crearTrabajador
);

module.exports = router;