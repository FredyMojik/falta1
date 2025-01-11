const express = require('express');
const router = express.Router();
const { Equipo, UsuarioEquipo, Usuario, Evento } = require('../models'); // Importar los modelos necesarios

// Ruta para crear un equipo
router.post('/crear', async (req, res) => {
    const { id_usuario, nombre_del_equipo } = req.body;
    try {
        // Crear el equipo
        const equipo = await Equipo.create({
            nombre_del_equipo,
            id_capitan: id_usuario,
        });

        // Asociar al capitán con el equipo
        await UsuarioEquipo.create({
            id_usuario,
            id_equipo: equipo.id_equipo,
            rol: 'capitán',
        });

        res.status(201).json({ message: 'Equipo creado exitosamente', equipo });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el equipo.' });
    }
});

// Ruta para obtener el equipo de un jugador
router.get('/mi_equipo/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;
    try {
        const usuarioEquipo = await UsuarioEquipo.findOne({
            where: { id_usuario },
            include: [{ model: Equipo, as: 'equipo' }]
        });

        if (!usuarioEquipo) {
            return res.status(404).json({ message: 'El jugador no está en ningún equipo.' });
        }

        res.json(usuarioEquipo.equipo);  // Devuelve la información del equipo
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el equipo del jugador.' });
    }
});

// Ruta para agregar un jugador a un equipo
router.post('/agregar_jugador', async (req, res) => {
    const { id_usuario, id_equipo } = req.body;
    try {
        // Verificar que el usuario no esté ya en el equipo
        const usuarioEquipo = await UsuarioEquipo.findOne({
            where: { id_usuario, id_equipo }
        });

        if (usuarioEquipo) {
            return res.status(400).json({ message: 'El jugador ya pertenece a este equipo.' });
        }

        // Agregar jugador al equipo
        await UsuarioEquipo.create({
            id_usuario,
            id_equipo,
            rol: 'jugador',
        });

        res.status(200).json({ message: 'Jugador agregado al equipo exitosamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar jugador al equipo.' });
    }
});

// Ruta para eliminar un jugador de un equipo
router.delete('/eliminar_jugador', async (req, res) => {
    const { id_usuario, id_equipo } = req.body;
    try {
        // Verificar si el jugador pertenece al equipo
        const usuarioEquipo = await UsuarioEquipo.findOne({
            where: { id_usuario, id_equipo }
        });

        if (!usuarioEquipo) {
            return res.status(404).json({ message: 'El jugador no pertenece a este equipo.' });
        }

        // Eliminar jugador del equipo
        await usuarioEquipo.destroy();

        res.status(200).json({ message: 'Jugador eliminado del equipo.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar jugador del equipo.' });
    }
});

// Ruta para inscribir un equipo en un evento
router.post('/inscribir_en_evento', async (req, res) => {
    const { id_equipo, id_evento } = req.body;

    try {
        // Verificar si el evento existe
        const evento = await Evento.findByPk(id_evento);
        if (!evento) {
            return res.status(404).json({ message: 'Evento no encontrado.' });
        }

        // Inscribir el equipo en el evento
        await evento.addEquipo(id_equipo);  // Suponiendo que "addEquipo" es un método definido por Sequelize

        res.status(200).json({ message: 'Equipo inscrito en el evento exitosamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al inscribir el equipo en el evento.' });
    }
});

// Ruta para obtener los equipos inscritos en un evento
router.get('/equipos_inscritos_en_evento/:id_evento', async (req, res) => {
    const { id_evento } = req.params;

    try {
        const evento = await Evento.findByPk(id_evento, {
            include: [{ model: Equipo, as: 'equipos' }]
        });

        if (!evento) {
            return res.status(404).json({ message: 'Evento no encontrado.' });
        }

        res.status(200).json(evento.equipos);  // Devuelve los equipos inscritos en el evento
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los equipos inscritos.' });
    }
});

module.exports = router;

