const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Notificacion', {
        id_notificacion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        mensaje: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        tipo: {
            type: DataTypes.STRING(50),
            allowNull: false, // Tipos: evento_creado, evento_lleno, recordatorio, etc.
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'usuarios',
                key: 'id_usuario',
            },
        },
        id_empresa: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'empresas',
                key: 'id_empresa',
            },
        },
        id_evento: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'eventos', // Relación con eventos
                key: 'id_evento',
            },
        },
        estado: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: 'pendiente', // Estados: pendiente, leída, enviada
        },
        destinatario_global: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false, // Indica si la notificación es para todos los usuarios
        },
        fecha_envio: {
            type: DataTypes.DATE,
            allowNull: true, // Fecha en la que se envió la notificación
        },
    }, {
        tableName: 'notificaciones',
        timestamps: true,
    });
};

