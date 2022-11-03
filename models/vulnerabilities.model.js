const sequelize = require('../handlers/db')
const {DataTypes} = require("sequelize");


const Vulnerabilities = sequelize.define("Vulnerabilities", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    script: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cleanupScript: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    tableName: 'Vulnerabilities',
    timestamps: false,
});




module.exports = Vulnerabilities;