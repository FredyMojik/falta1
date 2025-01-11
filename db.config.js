module.exports = {
    HOST: "localhost",
    USER: "tu_usuario_mysql",
    PASSWORD: "tu_contraseña_mysql",
    DB: "falta1",
    dialect: "mysql",
    pool: {
        max: 5, // Máximo de conexiones
        min: 0, // Mínimo de conexiones
        acquire: 30000, // Tiempo máximo en milisegundos que intentará conectar
        idle: 10000 // Tiempo que esperará antes de liberar la conexión
    }
};
