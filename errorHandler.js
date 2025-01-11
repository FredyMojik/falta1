const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: {
            message: err.message || "Ocurrió un error interno en el servidor.",
        },
    });
};

module.exports = errorHandler;
