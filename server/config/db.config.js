module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "Mysql123@",
    DB: "blog-db",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}