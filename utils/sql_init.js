const Users = require('../models/users.model');
const PasswordHistory = require('../models/passhistory.model');
const PWDTool = require("../utils/passwords");
const usersDefaultPassword = "Password1!";
const mysql = require("mysql2/promise");
const dbConfig = require("../config/db.config");

// Open the connection to MySQL server
mysql.createConnection({
  host: "localhost",
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
}).then((connection) => {
    connection.query(
        `CREATE DATABASE IF NOT EXISTS amtisploitdb;`).then(() => {
    var passRes = PWDTool.calculateHmacAndSalt(usersDefaultPassword);
    var passwordHash = passRes.hmac;
    var passwordSalt = passRes.salt;

    PasswordHistory.sync({force: true}).then(() => {console.log("PasswordHistory table created")}).catch((err) => {console.log(err)});

    Users.sync({force: true}).then( () => {
        console.log('Users table created successfully!');
        Users.create({
            userName: "amitaybiton",
            passwordHash: `${passwordHash}`,
            passwordSalt: `${passwordSalt}`,
            firstName: "Amitay",
            lastName: "Biton",
            userRole: "Admin"
        }).then( res => {
            console.log(res);
        }).catch((error) => {
            console.error('Failed to create a new record : ', error);
        });
        PWDTool.archivePassword('amitaybiton',passwordHash,passwordSalt)

        Users.create({
            userName: "Admin",
            passwordHash: `${passwordHash}`,
            passwordSalt: `${passwordSalt}`,
            firstName: "User",
            lastName: "Administrator",
            userRole: "Admin"
        }).then( res => {
            console.log(res);
        }).catch((error) => {
            console.error('Failed to create a new record : ', error);
        });
        PWDTool.archivePassword('Admin',passwordHash,passwordSalt)

        Users.create({
            userName: "tomermk@gmail.com",
            passwordHash: `${passwordHash}`,
            passwordSalt: `${passwordSalt}`,
            firstName: "Tomer",
            lastName: "Mekler",
            userRole: "User"
        }).then( res => {
            console.log(res);
        }).catch((error) => {
            console.error('Failed to create a new record : ', error);
        });
        PWDTool.archivePassword('tomermk@gmail.com',passwordHash,passwordSalt)
        
    }).catch((error) => {
        console.error('Unable to create table: ',error);
    });
            })
connection.end();
}).catch((err) => { console.log(err); });



