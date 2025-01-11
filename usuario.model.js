const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Usuario', {
        id_usuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        apellido: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        edad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true, // Valida formato de email
            },
        },
        contraseña: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        telefono: {
            type: DataTypes.STRING(15),
            allowNull: true,
        },
        deporte_favorito: {
            type: DataTypes.INTEGER, // Relación con la tabla de deportes
            allowNull: false,
        },
        deportes_adicionales: {
            type: DataTypes.JSON,  // Lista de deportes adicionales en formato JSON
            allowNull: true,
        },
        foto_perfil: {
            type: DataTypes.STRING(255), // Para la URL de la imagen del perfil
            allowNull: true,
        },
    }, {
        tableName: 'usuarios', // Nombre de la tabla en la base de datos
        timestamps: true, // Agrega columnas createdAt y updatedAt automáticamente
    });
};
