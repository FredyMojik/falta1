const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('UsuarioEquipo', {
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'usuarios',
                key: 'id_usuario',
            },
        },
        id_equipo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'equipos',
                key: 'id_equipo',
            },
        },
        rol: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'jugador', // El rol puede ser jugador o capitán
        },
    });
};
