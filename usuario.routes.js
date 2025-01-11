const express = require('express');
const router = express.Router();
const { Usuario } = require('../models');
const { createUsuario, loginUsuario, getUsuario, updateUsuario, deleteUsuario } = require('../controllers/usuariosController'); // Asegúrate de que la importación sea correcta
const authMiddleware = require('../middleware/authMiddleware');  // Importamos el middleware de autenticación

// Ruta para registrar un nuevo usuario (POST) 
// Incluye nombre, apellido, edad, deportes favoritos y adicionales, foto de perfil, etc.
router.post('/register', createUsuario);

// Ruta para iniciar sesión (POST)
// Se valida email y contraseña, y se genera un token de sesión.
router.post('/login', loginUsuario);

// Ruta para obtener un usuario por ID (GET)
// Obtiene la información del usuario por su ID
// Esta ruta ahora está protegida con autenticación
router.get('/:id', authMiddleware, getUsuario);  // Aplicamos el middleware para proteger la ruta

// Ruta para actualizar un usuario por ID (PUT)
// Esta ruta también está protegida con autenticación
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { nombre, apellido, edad, email, telefono, deporte_favorito, deportes_adicionales, foto_perfil } = req.body;
        const usuario = await Usuario.findByPk(req.params.id);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        usuario.nombre = nombre || usuario.nombre;
        usuario.apellido = apellido || usuario.apellido;
        usuario.edad = edad || usuario.edad;
        usuario.email = email || usuario.email;
        usuario.telefono = telefono || usuario.telefono;
        usuario.deporte_favorito = deporte_favorito || usuario.deporte_favorito;
        usuario.deportes_adicionales = deportes_adicionales || usuario.deportes_adicionales;
        usuario.foto_perfil = foto_perfil || usuario.foto_perfil;

        await usuario.save();
        res.status(200).json(usuario);
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
});

// Ruta para eliminar un usuario por ID (DELETE)
// Esta ruta también está protegida con autenticación
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        await usuario.destroy(); // Eliminar el usuario
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
});

module.exports = router;


