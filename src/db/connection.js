const mysql  = require("mysql2/promise");
require('dotenv').config();

const user = process.env.DB_NAME
const password = process.env.DB_PASSWORD
const host = process.env.DB_HOST
const ip = process.env.DB_IP
const port = process.env.DB_PORT
const database = process.env.DB_DATABASE

const connection = mysql.createPool({
    host     : host| ip,
    user     : user,
    password : password,
    port     : port,
    database: database
})

module.exports = connection;