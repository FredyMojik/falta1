const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extraer token del header

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verificar token
        req.user = decoded;  // Adjuntar datos del usuario a la solicitud
        next();  // Continuar con la ejecución de la ruta
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido' });
    }
};

module.exports = authMiddleware;
