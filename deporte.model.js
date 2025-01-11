const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Deporte', {
        id_deporte: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        tableName: 'deportes', // Nombre de la tabla en la base de datos
        timestamps: false, // No agregar columnas createdAt y updatedAt
    });
};


