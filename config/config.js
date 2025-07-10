module.exports = {
  development: {
    username: "postgres",
    password: "23904670pS",
    database: "agri_mashinani_db",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  test: {
    username: "postgres",
    password: "23904670pS",
    database: "agri_mashinani_db_test",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    use_env_variable: "DATABASE_URL", // ✅ uses internal railway URL
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
