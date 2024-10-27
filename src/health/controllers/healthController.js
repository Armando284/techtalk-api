const { sequelize } = require('../../users/models');

async function checkDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
    return { status: 'ok', database: 'connected' };
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return { status: 'error', database: 'disconnected', error: error.message };
  }
}

exports.checkHealth = async (req, res, next) => {
  try {
    const response = await checkDatabaseConnection()
    res.json(response)
  } catch (error) {
    res.status(500).json({ error: 'Server check health error!' })
  }
}
