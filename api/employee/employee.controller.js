const { Employee, Job } = require('../../sequelize');


// Get All Employees
exports.index = function (req, res) {
  let page = Number(req.query.page) || 1,
    limit = Number(req.query.limit) || 10,
    skip = (page - 1) * limit;

  Employee
    .findAndCountAll({
      includes: [
        { model: Job, as: 'Jobss' }
      ],
      offset: skip,
      limit: limit
    })
    .then(result => {
      res.json(200, {
        success: true,
        message: null,
        total: result.count,
        employees: result.rows
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

  Employee
    .findByPk(req.params.id)
    .then(result => {
      if (!result) {
        return res.json(404, {
          success: true, message: "Employees id Not Found!"
        });
      }

      res.json(200, { success: true, message: null, employee: result });
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
    .create(req.body)
    .then(result => {
      res.json(201, {
        success: true,
        message: result ? "Employee Created" : "Employee Not Created",
        result: result
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

exports.update = function (req, res) {
  if (req.body.employee_id) delete req.body.employee_id;

  Employee
    .findOne({
      where: { employee_id: req.params.id }
    })
    .then(result => {
      if (!result) {
        return res.json(404, {
          success: true, message: "Employees id Not Found!"
        });
      }

      result
        .update(req.body)
        .then(updated => {
          res.json(200, {
            success: true,
            message: 'Employee Updated!',
            employee: updated
          });
        }).catch(err => {
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
    })
};

exports.destroy = function (req, res) {
  Employee
    .destroy({
      where: { employee_id: req.params.id }
    })
    .then(result => {
      if (result === 0) return res.json(404, {
        success: true,
        message: "Employee id not found, nothing to delete!"
      });

      res.json(200, {
        success: true,
        message: "Employee Deleted",
        result: result
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