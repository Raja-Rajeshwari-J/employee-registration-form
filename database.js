const mysql = require('mysql2');
require("dotenv").config();

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS, 
    database: process.env.DATABASE
});

module.exports = db;

db.connect((err)=>{
    if(err){
        console.log(err);
    } else{
        console.log('Connected to database');
    }
});