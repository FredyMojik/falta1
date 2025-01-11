const getNotificaciones = async (req, res) => {
    try {
        // Lógica para obtener las notificaciones
        res.status(200).json({ message: "Notificaciones obtenidas correctamente." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const sendNotificacion = async (req, res) => {
    try {
        // Lógica para enviar una notificación
        res.status(200).json({ message: "Notificación enviada correctamente." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getNotificaciones,
    sendNotificacion,
};
