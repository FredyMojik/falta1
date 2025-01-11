const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Empresa', {
        id_empresa: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        direccion: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        telefono: {
            type: DataTypes.STRING(15),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true, // Valida formato de email
            },
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        cuenta_yappy: { // Nuevo campo
            type: DataTypes.STRING(100),
            allowNull: false, // Campo obligatorio
            unique: true, // Debe ser único para cada empresa
        },
    }, {
        tableName: 'empresas', // Nombre de la tabla en la base de datos
        timestamps: true, // Agrega columnas createdAt y updatedAt automáticamente
    });
};
