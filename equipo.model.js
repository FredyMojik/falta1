const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Equipo', {
        id_equipo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre_del_equipo: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        id_capitan: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'usuarios', // Relación con el modelo Usuario
                key: 'id_usuario',
            },
        },
        fecha_creacion: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    });
};
