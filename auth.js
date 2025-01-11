const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({ message: "Acceso denegado. Token no proporcionado." });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next(); // El token es válido, continúa con la solicitud
    } catch (error) {
        res.status(403).json({ message: "Token inválido." });
    }
};

module.exports = authenticateToken;
