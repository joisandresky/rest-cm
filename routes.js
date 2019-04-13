module.exports = function (app) {
  app.use('/api/jobs', require('./api/job'));
  app.use('/api/employees', require('./api/employee'));
  app.use('/api/cashIns', require('./api/cashIn'));
}