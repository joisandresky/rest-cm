module.exports = (sequelize, type) => {
    return sequelize.define('job', {
        job_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        job_title: {
            type: type.STRING,
            allowNull: false
        }
    }, { timestamps: true });
}