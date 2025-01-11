const express = require('express');
const { Deporte } = require('../models'); // Importa el modelo
const router = express.Router();

// Ruta para obtener todos los deportes (GET)
router.get('/', async (req, res) => {
    try {
        const deportes = await Deporte.findAll(); // Obtener todos los registros
        res.status(200).json(deportes);
    } catch (error) {
        console.error('Error al obtener los deportes:', error);
        res.status(500).json({ error: 'Error al obtener los deportes' });
    }
});

// Ruta para obtener un deporte por ID (GET)
router.get('/:id', async (req, res) => {
    try {
        const deporte = await Deporte.findByPk(req.params.id); // Buscar por ID
        if (!deporte) {
            return res.status(404).json({ error: 'Deporte no encontrado' });
        }
        res.status(200).json(deporte);
    } catch (error) {
        console.error('Error al obtener el deporte:', error);
        res.status(500).json({ error: 'Error al obtener el deporte' });
    }
});

// Ruta para crear un nuevo deporte (POST)
router.post('/', async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        if (!nombre) {
            return res.status(400).json({ error: 'El campo "nombre" es obligatorio.' });
        }
        const nuevoDeporte = await Deporte.create({ nombre, descripcion });
        res.status(201).json(nuevoDeporte);
    } catch (error) {
        console.error('Error al crear el deporte:', error);
        res.status(500).json({ error: 'Error al crear el deporte' });
    }
});

// Ruta para actualizar un deporte por ID (PUT)
router.put('/:id', async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const deporte = await Deporte.findByPk(req.params.id); // Buscar por ID
        if (!deporte) {
            return res.status(404).json({ error: 'Deporte no encontrado' });
        }
        deporte.nombre = nombre || deporte.nombre;
        deporte.descripcion = descripcion || deporte.descripcion;
        await deporte.save(); // Guardar los cambios
        res.status(200).json(deporte);
    } catch (error) {
        console.error('Error al actualizar el deporte:', error);
        res.status(500).json({ error: 'Error al actualizar el deporte' });
    }
});

// Ruta para eliminar un deporte por ID (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const deporte = await Deporte.findByPk(req.params.id); // Buscar por ID
        if (!deporte) {
            return res.status(404).json({ error: 'Deporte no encontrado' });
        }
        await deporte.destroy(); // Eliminar el registro
        res.status(200).json({ message: 'Deporte eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el deporte:', error);
        res.status(500).json({ error: 'Error al eliminar el deporte' });
    }
});

module.exports = router;

