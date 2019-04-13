const { Job } = require('../../sequelize');
const Sequelize = require('sequelize');


// Get All Jobs
exports.index = function (req, res) {
  let page = Number(req.query.page) || 1,
    limit = Number(req.query.limit) || 10,
    skip = (page - 1) * limit;

  Job
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

exports.search = function (req, res) {
  console.log('req query', req.query);
  Job
    .findAll({
      where: {
        job_title: {
          [Sequelize.Op.substring]: '%' + req.query.value + '%'
        }
      }
    })
    .then(result => {
      res.json(200, result);
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

  Job
    .findByPk(req.params.id)
    .then(result => {
      if (!result) {
        return res.json(404, {
          success: true, message: "Jobs id Not Found!"
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
  Job
    .create(req.body)
    .then(result => {
      res.json(201, {
        success: true,
        message: result ? "Job Created" : "Job Not Created",
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
  if (req.body.job_id) delete req.body.job_id;

  Job
    .findOne({
      where: { job_id: req.params.id }
    })
    .then(result => {
      if (!result) {
        return res.json(404, {
          success: true, message: "Jobs id Not Found!"
        });
      }

      result
        .update(req.body)
        .then(updated => {
          res.json(200, {
            success: true,
            message: 'Job Updated!',
            job: updated
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
  Job
    .destroy({
      where: { job_id: req.params.id }
    })
    .then(result => {
      if (result === 0) return res.json(404, {
        success: true,
        message: "Job id not found, nothing to delete!"
      });

      res.json(200, {
        success: true,
        message: "Job Deleted",
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