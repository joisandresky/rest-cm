const Sequelize = require('sequelize');
const { HOST, USER, PWD, DBNAME, DIALECT } = require('../config').DB;

const sequelize = new Sequelize(
    DBNAME,
    USER,
    PWD,
    {
        host: HOST,
        dialect: DIALECT,
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

sequelize.sync({ force: false })
    .then(() => console.log('Database and Table Created'));

module.exports = {};