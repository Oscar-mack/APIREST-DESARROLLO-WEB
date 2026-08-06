
module.exports = {
  HOST: process.env.DB_HOST && process.env.DB_HOST.trim(),
  USER: process.env.DB_USER && process.env.DB_USER.trim(),
  PASSWORD: process.env.DB_PASSWORD && process.env.DB_PASSWORD.trim(),
  DB: process.env.DB_NAME && process.env.DB_NAME.trim(),
  dialect: process.env.DB_DIALECT || "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};








