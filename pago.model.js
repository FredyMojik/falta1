const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Pago', {
        id_pago: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        monto: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        estado: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: 'pendiente', // Estado inicial
        },
        metodo_pago: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: 'Yappy', // Método por defecto
        },
        fecha_pago: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW, // Fecha por defecto al momento del pago
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'usuarios', // Relación con usuarios
                key: 'id_usuario',
            },
        },
        id_evento: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'eventos', // Relación con eventos
                key: 'id_evento',
            },
        },
    }, {
        tableName: 'pagos', // Nombre de la tabla en la base de datos
        timestamps: true, // Agrega columnas createdAt y updatedAt automáticamente
    });
};
