module.exports = (sequelize, type) => {
  return sequelize.define('cashin', {
    trx_id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    trx_amount: {
      type: type.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    trx_employee_amount: {
      type: type.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    trx_description: {
      type: type.TEXT,
      allowNull: true
    }
  }, { timestamps: true });
}