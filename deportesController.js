const getDeportes = async (req, res) => {
    try {
        // Lógica para obtener los deportes
        res.status(200).json({ message: "Deportes obtenidos correctamente." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createDeporte = async (req, res) => {
    try {
        // Lógica para crear un nuevo deporte
        res.status(201).json({ message: "Deporte creado correctamente." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getDeportes,
    createDeporte,
};
