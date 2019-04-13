module.exports = (sequelize, type) => {
  return sequelize.define('employee', {
    employee_id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    employee_name: {
      type: type.STRING,
      allowNull: false
    },
    employee_gender: {
      type: type.STRING,
      allowNull: false
    },
    employee_phone: {
      type: type.STRING,
      allowNull: false
    },
    employee_address: {
      type: type.TEXT,
      allowNull: false
    },
    employee_balance: {
      type: type.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    employee_job: {
      type: type.INTEGER,
      allowNull: false
    },
  }, { timestamps: true });
}

// id, name, gender, phone, address, job
// int = INTEGER, varchar = STRING, text = TEXT
// enum = ENUM('Y', 'N')