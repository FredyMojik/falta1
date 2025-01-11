const express = require('express');
const router = express.Router();
const { Notificacion } = require('../models');

// Obtener todas las notificaciones
router.get('/', async (req, res) => {
    try {
        const notificaciones = await Notificacion.findAll();
        res.json(notificaciones);
    } catch (error) {
        console.error('Error al obtener las notificaciones:', error);
        res.status(500).json({ error: 'Error al obtener las notificaciones.' });
    }
});

// Obtener notificaciones por usuario
router.get('/usuario/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;
    try {
        const notificaciones = await Notificacion.findAll({
            where: { id_usuario },
        });
        res.json(notificaciones);
    } catch (error) {
        console.error('Error al obtener las notificaciones del usuario:', error);
        res.status(500).json({ error: 'Error al obtener las notificaciones del usuario.' });
    }
});

// Obtener notificaciones globales
router.get('/global', async (req, res) => {
    try {
        const notificaciones = await Notificacion.findAll({
            where: { destinatario_global: true },
        });
        res.json(notificaciones);
    } catch (error) {
        console.error('Error al obtener las notificaciones globales:', error);
        res.status(500).json({ error: 'Error al obtener las notificaciones globales.' });
    }
});

// Crear una nueva notificación
router.post('/', async (req, res) => {
    const { id_usuario, mensaje, tipo, estado, id_empresa, id_evento, destinatario_global } = req.body;
    try {
        const nuevaNotificacion = await Notificacion.create({
            id_usuario,
            mensaje,
            tipo,
            estado,
            id_empresa,
            id_evento,
            destinatario_global,
        });
        res.status(201).json(nuevaNotificacion);
    } catch (error) {
        console.error('Error al crear la notificación:', error);
        res.status(500).json({ error: 'Error al crear la notificación.' });
    }
});

// Actualizar una notificación
router.put('/:id_notificacion', async (req, res) => {
    const { id_notificacion } = req.params;
    const { mensaje, tipo, estado } = req.body;
    try {
        const notificacion = await Notificacion.findByPk(id_notificacion);
        if (!notificacion) {
            return res.status(404).json({ error: 'Notificación no encontrada.' });
        }
        await notificacion.update({ mensaje, tipo, estado });
        res.json(notificacion);
    } catch (error) {
        console.error('Error al actualizar la notificación:', error);
        res.status(500).json({ error: 'Error al actualizar la notificación.' });
    }
});

// Cambiar el estado de una notificación a "leída"
router.put('/marcarLeida/:id_notificacion', async (req, res) => {
    const { id_notificacion } = req.params;
    try {
        const notificacion = await Notificacion.findByPk(id_notificacion);
        if (!notificacion) {
            return res.status(404).json({ error: 'Notificación no encontrada.' });
        }
        await notificacion.update({ estado: 'leída' });
        res.json({ message: 'Notificación marcada como leída.', notificacion });
    } catch (error) {
        console.error('Error al marcar la notificación como leída:', error);
        res.status(500).json({ error: 'Error al marcar la notificación como leída.' });
    }
});

// Eliminar una notificación
router.delete('/:id_notificacion', async (req, res) => {
    const { id_notificacion } = req.params;
    try {
        const notificacion = await Notificacion.findByPk(id_notificacion);
        if (!notificacion) {
            return res.status(404).json({ error: 'Notificación no encontrada.' });
        }
        await notificacion.destroy();
        res.json({ message: 'Notificación eliminada correctamente.' });
    } catch (error) {
        console.error('Error al eliminar la notificación:', error);
        res.status(500).json({ error: 'Error al eliminar la notificación.' });
    }
});

module.exports = router;


