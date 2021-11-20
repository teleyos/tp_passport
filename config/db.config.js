const { createPool } = require("mysql");
const env = require('dotenv')
env.config();
/** Connection pool creation - START */
//CHANGER LES PARAMS DANS le fichier .ENV
const db = createPool({
    port: 3306,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_Database,
    connectionLimit: 10,
});
/** Connection pool creation - END */
module.exports = db;