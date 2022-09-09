const sequelize = require('../handlers/db')
const {DataTypes} = require("sequelize");


const Users = sequelize.define("Users", {
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    passwordSalt: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
    },
    emailAddress: {
        type: DataTypes.STRING,
    },
    userRole: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'Users'
});




module.exports = Users;