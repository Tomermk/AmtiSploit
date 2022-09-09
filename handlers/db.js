const Sequelize = require('sequelize');
const dbConfig = require("../config/db.config");

// Create a connection to the database
//const connection = mysql.createConnection({
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: 'mysql'
    }
);


sequelize.authenticate().then( () =>{
    console.log("Successfully connected to the database!");
}).catch( (error) =>{
    console.error('Unbale to connect to the database: ',error);
});

module.exports = sequelize;