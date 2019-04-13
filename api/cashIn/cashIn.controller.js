const { CashIn, Employee, db } = require('../../sequelize');
const Sequelize = require('sequelize');

// Get All CashIns
exports.index = function (req, res) {
  let page = Number(req.query.page) || 1,
    limit = Number(req.query.limit) || 10,
    skip = (page - 1) * limit;

  CashIn
    .findAndCountAll({
      offset: skip,
      limit: limit
    })
    .then(result => {
      res.json(200, {
        success: true,
        message: null,
        total: result.count,
        jobs: result.rows
      });
    })
    .catch(err => {
      res.send(500, {
        success: false,
        message: "INTERNAL SERVER ERROR",
        error: err
      });
    });
};

exports.show = function (req, res) {
  if (!req.params.id) return res.json(400, {
    success: true,
    message: "Parameter ID Cannot Be null"
  });

  CashIn
    .findByPk(req.params.id)
    .then(result => {
      if (!result) {
        return res.json(404, {
          success: true, message: "CashIns id Not Found!"
        });
      }

      res.json(200, { success: true, message: null, job: result });
    })
    .catch(err => {
      console.log('err', err);
      res.send(500, {
        success: false,
        message: "INTERNAL SERVER ERROR",
        error: err
      });
    });
};

exports.create = function (req, res) {
  Employee
    .count()
    .then(total => {
      let amount = req.body.trx_amount / total;
      req.body.trx_employee_amount = amount;
      CashIn
        .create(req.body)
        .then(result => {
          db.query('UPDATE employees SET employee_balance = employee_balance + ' + amount)
            .then(function (updated) {
              console.log('updated', updated);
              res.json(201, {
                success: true,
                message: result ? "CashIn Created" : "CashIn Not Created",
                result: result
              });
            })
            .catch(err => {
              console.log('err', err);
              res.send(500, {
                success: false,
                message: "INTERNAL SERVER ERROR - FAILED TO UPDATE EMPLOYEE BALANCED",
                error: err
              });
            });
        })
        .catch(err => {
          console.log('err', err);
          res.send(500, {
            success: false,
            message: "INTERNAL SERVER ERROR",
            error: err
          });
        });
    })
    .catch(err => {
      console.log('err', err);
      res.send(500, {
        success: false,
        message: "INTERNAL SERVER ERROR",
        error: err
      });
    });
};