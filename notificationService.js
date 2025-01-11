const { Evento, Notificacion, Usuario } = require('../models');
const { Op } = require('sequelize');

const sendUpcomingEventNotifications = async () => {
    try {
        console.log('Ejecutando notificaciones automáticas...');

        const ahora = new Date();
        const proximas48Horas = new Date(ahora.getTime() + 48 * 60 * 60 * 1000);
        const proximas6Horas = new Date(ahora.getTime() + 6 * 60 * 60 * 1000);

        // 1. Obtener eventos en las próximas 48 horas
        const eventos = await Evento.findAll({
            where: {
                fecha_hora: { [Op.between]: [ahora, proximas48Horas] },
                estado: 'pendiente',
            },
            include: [{ model: Usuario, as: 'usuarios' }],
        });

        for (const evento of eventos) {
            const horasRestantes = (new Date(evento.fecha_hora) - ahora) / (1000 * 60 * 60);
            const jugadoresFaltantes = evento.jugadores_faltantes;

            // 2. Notificaciones por evento
            if (jugadoresFaltantes > 0) {
                // Cada 12 horas
                if (horasRestantes > 6 && horasRestantes % 12 === 0) {
                    await crearNotificacionGlobal(evento, `¡No te pierdas el evento de ${evento.titulo}! Faltan ${jugadoresFaltantes} jugadores.`);
                }

                // Cada hora (si quedan menos de 6 horas)
                if (horasRestantes <= 6) {
                    await crearNotificacionGlobal(evento, `¡Última oportunidad! Faltan ${jugadoresFaltantes} jugadores para el evento de ${evento.titulo}.`);
                }
            } else if (jugadoresFaltantes === 0 && evento.estado !== 'lleno') {
                // Notificar que el evento está lleno
                await notificarEventoLleno(evento);
            }
        }
    } catch (error) {
        console.error('Error en las notificaciones automáticas:', error);
    }
};

// Crear una notificación global
const crearNotificacionGlobal = async (evento, mensaje) => {
    await Notificacion.create({
        mensaje,
        tipo: 'recordatorio',
        id_evento: evento.id_evento,
        destinatario_global: true,
        estado: 'pendiente',
    });
    console.log(`Notificación creada: ${mensaje}`);
};

// Notificar a los usuarios y la cancha cuando el evento esté lleno
const notificarEventoLleno = async (evento) => {
    const usuarios = await evento.getUsuarios(); // Obtener usuarios inscritos
    for (const usuario of usuarios) {
        await Notificacion.create({
            mensaje: `¡El evento de ${evento.titulo} está lleno! Prepárate para el partido.`,
            tipo: 'evento_lleno',
            id_usuario: usuario.id_usuario,
            id_evento: evento.id_evento,
            estado: 'pendiente',
        });
    }

    await Notificacion.create({
        mensaje: `El evento de ${evento.titulo} está lleno. Todos los jugadores han sido notificados.`,
        tipo: 'evento_lleno',
        id_empresa: evento.id_empresa,
        id_evento: evento.id_evento,
        estado: 'pendiente',
    });

    // Actualizar el estado del evento
    evento.estado = 'lleno';
    await evento.save();
    console.log(`Evento ${evento.titulo} marcado como lleno.`);
};

module.exports = { sendUpcomingEventNotifications };
