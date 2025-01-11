const express = require('express');
const { getEventos, createEvento, eliminarEventosExpirados } = require('../controllers/eventosController');
const authMiddleware = require('../middleware/authMiddleware');  // Importamos el middleware para autenticación

const router = express.Router();

// Ruta para obtener todos los eventos (GET)
router.get('/', getEventos);

// Ruta para crear un nuevo evento (POST)
// Esta ruta está protegida con autenticación
router.post('/', authMiddleware, createEvento);  // Aplicamos el middleware para proteger la ruta

// Ruta para eliminar los eventos expirados (DELETE)
// Esta ruta también está protegida con autenticación
router.delete('/eliminar-expirados', authMiddleware, eliminarEventosExpirados);  // Aplicamos el middleware para proteger la ruta

module.exports = router;





