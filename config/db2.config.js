const Sequelize = require('sequelize');
const env = require('dotenv')
env.config();
const sequelize = new Sequelize(process.env.DB_Database, process.env.DB_USER, process.env.DB_PWD, {
    dialect: 'mysql',
    logging: console.log,
    host: process.env.DB_HOST,
    define: {
        timestamps: false
    }
});

sequelize.authenticate()
    .then(()=>console.log('Connection has been established successfully.'))
    .catch((error) => console.error('Unable to connect to the database:', error));


module.exports = sequelize;
