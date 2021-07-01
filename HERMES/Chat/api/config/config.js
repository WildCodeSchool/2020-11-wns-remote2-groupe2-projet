require('dotenv').config();

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',
    operatorsAliases: 1,
  },
  test: {
    use_env_variable: 'DATABASE_URL',
    operatorsAliases: 1,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    operatorsAliases: 1,
  },
};
