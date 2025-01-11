const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Evento', {
        id_evento: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        titulo: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        fecha_hora: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        estado: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: 'pendiente', // Estados posibles: pendiente, lleno, cancelado
        },
        jugadores_faltantes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 22, // Inicialmente, todos los lugares están disponibles
        },
        tipo_creador: {
            type: DataTypes.STRING(50),
            allowNull: false, // Valores: 'cancha' o 'usuario'
        },
        id_empresa: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'empresas', // Nombre de la tabla relacionada
                key: 'id_empresa',
            },
        },
        id_deporte: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'deportes', // Nombre de la tabla relacionada
                key: 'id_deporte',
            },
        },
    }, {
        tableName: 'eventos', // Nombre de la tabla en la base de datos
        timestamps: true, // Agrega columnas createdAt y updatedAt automáticamente
    });
};

