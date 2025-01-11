const express = require('express');
const { Empresa } = require('../models'); // Importa el modelo Empresa
const router = express.Router();

// Ruta para obtener todas las empresas (GET)
router.get('/', async (req, res) => {
    try {
        const empresas = await Empresa.findAll(); // Obtener todos los registros
        res.status(200).json(empresas);
    } catch (error) {
        console.error('Error al obtener las empresas:', error);
        res.status(500).json({ error: 'Error al obtener las empresas' });
    }
});

// Ruta para obtener una empresa por ID (GET)
router.get('/:id', async (req, res) => {
    try {
        const empresa = await Empresa.findByPk(req.params.id); // Buscar por ID
        if (!empresa) {
            return res.status(404).json({ error: 'Empresa no encontrada' });
        }
        res.status(200).json(empresa);
    } catch (error) {
        console.error('Error al obtener la empresa:', error);
        res.status(500).json({ error: 'Error al obtener la empresa' });
    }
});

// Ruta para crear una nueva empresa (POST)
router.post('/', async (req, res) => {
    try {
        const { nombre, direccion, telefono, email, descripcion, cuenta_yappy } = req.body;
        if (!nombre || !direccion || !email || !cuenta_yappy) {
            return res.status(400).json({ error: 'Los campos "nombre", "direccion", "email" y "cuenta_yappy" son obligatorios.' });
        }
        const nuevaEmpresa = await Empresa.create({ nombre, direccion, telefono, email, descripcion, cuenta_yappy });
        res.status(201).json(nuevaEmpresa);
    } catch (error) {
        console.error('Error al crear la empresa:', error);
        res.status(500).json({ error: 'Error al crear la empresa' });
    }
});

// Ruta para actualizar una empresa por ID (PUT)
router.put('/:id', async (req, res) => {
    try {
        const { nombre, direccion, telefono, email, descripcion, cuenta_yappy } = req.body;
        const empresa = await Empresa.findByPk(req.params.id); // Buscar por ID
        if (!empresa) {
            return res.status(404).json({ error: 'Empresa no encontrada' });
        }
        empresa.nombre = nombre || empresa.nombre;
        empresa.direccion = direccion || empresa.direccion;
        empresa.telefono = telefono || empresa.telefono;
        empresa.email = email || empresa.email;
        empresa.descripcion = descripcion || empresa.descripcion;
        empresa.cuenta_yappy = cuenta_yappy || empresa.cuenta_yappy; // Actualizar el campo cuenta_yappy
        await empresa.save(); // Guardar los cambios
        res.status(200).json(empresa);
    } catch (error) {
        console.error('Error al actualizar la empresa:', error);
        res.status(500).json({ error: 'Error al actualizar la empresa' });
    }
});

// Ruta para eliminar una empresa por ID (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const empresa = await Empresa.findByPk(req.params.id); // Buscar por ID
        if (!empresa) {
            return res.status(404).json({ error: 'Empresa no encontrada' });
        }
        await empresa.destroy(); // Eliminar el registro
        res.status(200).json({ message: 'Empresa eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la empresa:', error);
        res.status(500).json({ error: 'Error al eliminar la empresa' });
    }
});

module.exports = router;
