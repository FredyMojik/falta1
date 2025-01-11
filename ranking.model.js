const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Ranking = sequelize.define('Ranking', {
        id_usuario: {
            type: DataTypes.INTEGER,
            references: {
                model: 'usuarios', // Relación con el modelo Usuario
                key: 'id_usuario',
            },
        },
        id_equipo: {
            type: DataTypes.INTEGER,
            references: {
                model: 'equipos', // Relación con el modelo Equipo
                key: 'id_equipo',
            },
        },
        puntos: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        tipo: {
            type: DataTypes.STRING, // Puede ser 'jugador' o 'equipo'
        },
    });

    // Método para obtener los top 5
    Ranking.getTop5 = async (tipo) => {
        return await Ranking.findAll({
            where: { tipo: tipo },
            order: [['puntos', 'DESC']],
            limit: 5, // Obtiene solo los primeros 5
        });
    };

    return Ranking;
};
