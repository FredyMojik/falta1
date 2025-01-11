const { Usuario } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Crear un nuevo usuario
const createUsuario = async (req, res) => {
    try {
        const { nombre, apellido, edad, email, contraseña, telefono, deporte_favorito, deportes_adicionales, foto_perfil } = req.body;

        // Verificar si el email ya existe en la base de datos
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
        }

        // Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        // Crear el nuevo usuario
        const nuevoUsuario = await Usuario.create({
            nombre,
            apellido,
            edad,
            email,
            contraseña: hashedPassword,
            telefono,
            deporte_favorito,
            deportes_adicionales,
            foto_perfil,
        });

        res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
};

// Iniciar sesión y generar un token JWT
const loginUsuario = async (req, res) => {
    try {
        const { email, contraseña } = req.body;

        // Buscar al usuario por email
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Verificar la contraseña
        const esValido = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!esValido) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }

        // Generar un token de sesión
        const token = jwt.sign({ id_usuario: usuario.id_usuario }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error en el login del usuario:', error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};

// Obtener un usuario por ID
const getUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

// Actualizar la información de un usuario
const updateUsuario = async (req, res) => {
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
};

// Eliminar un usuario
const deleteUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        await usuario.destroy();
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};

module.exports = {
    createUsuario,
    loginUsuario,
    getUsuario,
    updateUsuario,
    deleteUsuario
};




