const sequelize = require('../handlers/db')
const {DataTypes} = require("sequelize");


const PasswordHistory = sequelize.define("passwordhistory", {
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    passwordSalt: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    tableName: 'passwordhistory'
});




module.exports = PasswordHistory;