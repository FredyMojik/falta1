const express = require('express');
const { Pago, Evento, Usuario } = require('../models'); // Importamos los modelos relacionados
const router = express.Router();

// Obtener todos los pagos (GET)
router.get('/', async (req, res) => {
    try {
        const pagos = await Pago.findAll({
            include: [
                { model: Evento, attributes: ['titulo'] }, // Incluye información del evento
                { model: Usuario, attributes: ['nombre', 'email'] } // Incluye información del usuario
            ],
        });
        res.status(200).json(pagos);
    } catch (error) {
        console.error('Error al obtener los pagos:', error);
        res.status(500).json({ error: 'Error al obtener los pagos' });
    }
});

// Obtener un pago por ID (GET)
router.get('/:id', async (req, res) => {
    try {
        const pago = await Pago.findByPk(req.params.id, {
            include: [
                { model: Evento, attributes: ['titulo'] },
                { model: Usuario, attributes: ['nombre', 'email'] }
            ],
        });
        if (!pago) {
            return res.status(404).json({ error: 'Pago no encontrado' });
        }
        res.status(200).json(pago);
    } catch (error) {
        console.error('Error al obtener el pago:', error);
        res.status(500).json({ error: 'Error al obtener el pago' });
    }
});

// Crear un nuevo pago (POST)
router.post('/', async (req, res) => {
    try {
        const { monto, estado, id_usuario, id_evento } = req.body;
        if (!monto || !id_usuario || !id_evento) {
            return res.status(400).json({ error: 'Los campos "monto", "id_usuario" e "id_evento" son obligatorios.' });
        }
        const nuevoPago = await Pago.create({ monto, estado, id_usuario, id_evento });
        res.status(201).json(nuevoPago);
    } catch (error) {
        console.error('Error al crear el pago:', error);
        res.status(500).json({ error: 'Error al crear el pago' });
    }
});

// Actualizar un pago por ID (PUT)
router.put('/:id', async (req, res) => {
    try {
        const { monto, estado, id_usuario, id_evento } = req.body;
        const pago = await Pago.findByPk(req.params.id);
        if (!pago) {
            return res.status(404).json({ error: 'Pago no encontrado' });
        }
        pago.monto = monto || pago.monto;
        pago.estado = estado || pago.estado;
        pago.id_usuario = id_usuario || pago.id_usuario;
        pago.id_evento = id_evento || pago.id_evento;
        await pago.save(); // Guarda los cambios
        res.status(200).json(pago);
    } catch (error) {
        console.error('Error al actualizar el pago:', error);
        res.status(500).json({ error: 'Error al actualizar el pago' });
    }
});

// Eliminar un pago por ID (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const pago = await Pago.findByPk(req.params.id);
        if (!pago) {
            return res.status(404).json({ error: 'Pago no encontrado' });
        }
        await pago.destroy(); // Elimina el registro
        res.status(200).json({ message: 'Pago eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el pago:', error);
        res.status(500).json({ error: 'Error al eliminar el pago' });
    }
});

module.exports = router;
