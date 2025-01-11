const { Evento, Notificacion, Deporte, Empresa } = require('../models');
const Sequelize = require('sequelize');

// Obtener todos los eventos con las relaciones
const getEventos = async (req, res) => {
    try {
        // Eliminar eventos que hayan pasado
        await eliminarEventosExpirados();  // Llamamos a la función para eliminar eventos expirados

        const eventos = await Evento.findAll({
            include: [
                {
                    model: Deporte,
                    as: 'deporte',
                    attributes: ['nombre']
                },
                {
                    model: Empresa,
                    as: 'empresa',
                    attributes: ['nombre']
                }
            ]
        });

        console.log('Eventos obtenidos:', eventos);
        res.status(200).json(eventos);
    } catch (error) {
        console.error('Error al obtener los eventos:', error);
        res.status(500).json({ error: 'Error al obtener los eventos' });
    }
};

// Crear un nuevo evento
const createEvento = async (req, res) => {
    try {
        const { titulo, descripcion, fecha_hora, id_empresa, id_deporte, tipo_creador } = req.body;

        // Validar restricciones de tiempo
        const ahora = new Date();
        const fechaEvento = new Date(fecha_hora);
        const minutosRestantes = (fechaEvento - ahora) / (1000 * 60); // Diferencia en minutos

        if (tipo_creador === 'cancha' && minutosRestantes < 8 * 60) { // 8 horas en minutos
            return res.status(400).json({ error: 'Las canchas solo pueden crear eventos hasta 8 horas antes.' });
        }

        if (tipo_creador === 'usuario' && minutosRestantes < 24 * 60) { // 24 horas en minutos
            return res.status(400).json({ error: 'Los usuarios solo pueden crear eventos hasta 24 horas antes.' });
        }

        // Crear el evento
        const nuevoEvento = await Evento.create({
            titulo,
            descripcion,
            fecha_hora,
            estado: 'pendiente',
            jugadores_faltantes: 22, // Ejemplo para fútbol
            id_empresa,
            id_deporte,
            tipo_creador,
        });

        // Enviar notificaciones
        if (tipo_creador === 'cancha') {
            await Notificacion.create({
                id_usuario: null, // Notificación general
                mensaje: `Nuevo evento creado en ${titulo}. ¡Inscríbete ahora!`,
                id_evento: nuevoEvento.id_evento,
            });
        } else if (tipo_creador === 'usuario') {
            await Notificacion.create({
                id_empresa,
                mensaje: `Un usuario solicitó un evento en tu cancha: ${titulo}.`,
                id_evento: nuevoEvento.id_evento,
            });
        }

        res.status(201).json(nuevoEvento);
    } catch (error) {
        console.error('Error al crear el evento:', error);
        res.status(500).json({ error: 'Error al crear el evento' });
    }
};

// Función para eliminar los eventos expirados
const eliminarEventosExpirados = async () => {
    try {
        const fechaActual = new Date();  // Fecha actual para comparar

        // Eliminar los eventos cuya fecha_hora sea anterior a la fecha actual
        const resultado = await Evento.destroy({
            where: {
                fecha_hora: {
                    [Sequelize.Op.lt]: fechaActual,  // Solo los eventos con fecha anterior a la actual
                },
            },
        });

        console.log(`Eliminados ${resultado} eventos expirados.`);
    } catch (error) {
        console.error('Error al eliminar eventos expirados:', error);
    }
};

module.exports = {
    getEventos,
    createEvento,
    eliminarEventosExpirados,  // Exportamos la nueva función
};




