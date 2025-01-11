const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuración de Sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS || null,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }
);

// Importar los modelos
const Deporte = require('./deporte.model')(sequelize);
const Usuario = require('./usuario.model')(sequelize);
const Empresa = require('./empresa.model')(sequelize);
const Evento = require('./evento.model')(sequelize);
const Pago = require('./pago.model')(sequelize);
const Notificacion = require('./notificacion.model')(sequelize);
const Equipo = require('./equipo.model')(sequelize);
const UsuarioEquipo = require('./usuarios_equipos.model')(sequelize); // Relación Usuario-Equipo

// Definir las relaciones

// Evento -> Empresa
Evento.belongsTo(Empresa, { foreignKey: 'id_empresa', as: 'empresa' });
Empresa.hasMany(Evento, { foreignKey: 'id_empresa', as: 'eventos' });

// Evento -> Deporte
Evento.belongsTo(Deporte, { foreignKey: 'id_deporte', as: 'deporte' });
Deporte.hasMany(Evento, { foreignKey: 'id_deporte', as: 'eventos' });

// Pago -> Usuario
Pago.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });
Usuario.hasMany(Pago, { foreignKey: 'id_usuario', as: 'pagos' });

// Pago -> Evento
Pago.belongsTo(Evento, { foreignKey: 'id_evento', as: 'evento' });
Evento.hasMany(Pago, { foreignKey: 'id_evento', as: 'pagos' });

// Notificacion -> Usuario
Notificacion.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });
Usuario.hasMany(Notificacion, { foreignKey: 'id_usuario', as: 'notificaciones' });

// Notificacion -> Evento
Notificacion.belongsTo(Evento, { foreignKey: 'id_evento', as: 'evento' });
Evento.hasMany(Notificacion, { foreignKey: 'id_evento', as: 'notificaciones' });

// Relación entre Usuario y Equipo
Usuario.belongsToMany(Equipo, { through: 'UsuarioEquipo', foreignKey: 'id_usuario', as: 'equipos' });
Equipo.belongsToMany(Usuario, { through: 'UsuarioEquipo', foreignKey: 'id_equipo', as: 'usuarios' });

// Relación entre Evento y Equipo (para registrar la participación de un equipo en un evento)
Evento.belongsToMany(Equipo, { through: 'EventoEquipo', foreignKey: 'id_evento', as: 'equipos' });
Equipo.belongsToMany(Evento, { through: 'EventoEquipo', foreignKey: 'id_equipo', as: 'eventos' });

// Nuevas relaciones (si las necesitas en el futuro):
// Por ejemplo, si `Evento` tiene una relación con una tabla de rankings o estadísticas, se agregarían aquí.

// Exportar los modelos y la conexión
module.exports = {
    sequelize,
    Deporte,
    Usuario,
    Empresa,
    Evento,
    Pago,
    Notificacion,
    Equipo,
    UsuarioEquipo,
};










