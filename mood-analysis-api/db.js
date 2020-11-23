const mysql = require('mysql2/promise');
const Config = require('./config/config');

const connection = mysql.createPool(Config.dbParams);


module.exports = connection;