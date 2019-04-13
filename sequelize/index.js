const Sequelize = require('sequelize');
const { HOST, USER, PWD, DBNAME, DIALECT } = require('../config').DB;
const JobModel = require('../api/job/job.model');
const EmployeeModel = require('../api/employee/employee.model');
const CashInModel = require('../api/cashIn/cashIn.model');

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

const db = sequelize;

const Job = JobModel(sequelize, Sequelize);
const Employee = EmployeeModel(sequelize, Sequelize);
const CashIn = CashInModel(sequelize, Sequelize);

sequelize.sync({ force: false })
  .then(() => console.log('Database and Table Synced'));

module.exports = {
  Job,
  Employee,
  CashIn,
  db
};