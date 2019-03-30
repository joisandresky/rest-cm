module.exports = {
    DB: {
        HOST: process.env.DB_HOST || 'localhost',
        DBNAME: process.env.DB_NAME || 'cashmeal',
        USER: process.env.DB_USER || 'root',
        PWD: process.env.DB_PWD || '',
        DIALECT: process.env.DB_DIALECT || 'mysql'
    }
}