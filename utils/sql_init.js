const Users = require('../models/users.model');
const PasswordHistory = require('../models/passhistory.model');
const Vulnerabilities = require('../models/vulnerabilities.model');
const Exploits = require('../models/exploits.model');
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

    Vulnerabilities.sync({force: true}).then(() => {
        console.log("Vulnerabilities table created")
        Vulnerabilities.create({
            name: "Log4Shell",
            description: "Log4Shell is a vulnerability in the Apache Log4j library that allows remote code execution.",
            script: "docker run -p 8888:8888 -p 1389:1389 --e=IP=%hostname% --name log4shell ghcr.io/wh1t3h47/log4shell:latest \n docker run -p 8088:8088 ..."
        }).then(() => {
            console.log("Log4Shell vulnerability created")
        }).catch((err) => {console.log(err)});
        Vulnerabilities.create({
            name: "BlueKeep",
            description: "BlueKeep is a vulnerability in the Remote Desktop Protocol (RDP) that allows remote code execution.",
            script: "docker run -p 3389:3389 --e=IP=%hostname% --name bluekeep ghcr.io/wh1t3h47/log4shell:latest"
        }).then(() => {
            console.log("BlueKeep vulnerability created")
        }).catch((err) => {console.log(err)});
    }).catch((err) => {console.log(err)});

    Exploits.sync({force: true}).then(() => {
        console.log("Exploits table created")
        Exploits.create({
            host: "http://192.168.31.143:8080",
            attack: "Log4Shell",
            status: 2,
        }).then(() => {
        }).catch((err) => {console.log(err)});
        Exploits.create({
            host: "http://192.168.31.144:8080",
            attack: "Log4Shell",
            status: 3,
        }).then(() => {
        }).catch((err) => {console.log(err)});
        Exploits.create({
            host: "http://192.168.31.145:8080",
            attack: "BlueKeep",
            status: 1,
        }).then(() => {
        }).catch((err) => {console.log(err)});
    }).catch((err) => {console.log(err)});

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



