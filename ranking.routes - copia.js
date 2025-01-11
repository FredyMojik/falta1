const express = require('express');
const { Ranking, Usuario, Equipo } = require('../models');  // Importar el modelo Ranking
const router = express.Router();

// Ruta para obtener el ranking de equipos
router.get('/equipos', async (req, res) => {
    try {
        const rankingEquipos = await Ranking.findAll({
            where: { tipo: 'equipo' },
            include: [{ model: Equipo }],
            order: [['puntos', 'DESC']],
        });
        res.status(200).json(rankingEquipos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el ranking de equipos' });
    }
});

// Ruta para obtener el ranking de jugadores
router.get('/jugadores', async (req, res) => {
    try {
        const rankingJugadores = await Ranking.findAll({
            where: { tipo: 'jugador' },
            include: [{ model: Usuario }],
            order: [['puntos', 'DESC']],
        });
        res.status(200).json(rankingJugadores);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el ranking de jugadores' });
    }
});

module.exports = router;
