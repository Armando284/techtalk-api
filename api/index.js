const { config } = require('dotenv')
const app = require('../app');
const debug = require('debug')('techtalk-api:server');
const http = require('http');
const { sequelize } = require('../models')

if (process.env.NODE_ENV !== "production") {
  config();
}

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
runMigrations()

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

async function runMigrations() {
  try {
    console.log('Running migrations...');
    await sequelize.sync(); // O usa `sequelize.sync({ force: true })` si quieres sobrescribir tablas
    console.log('Migrations complete!');
  } catch (error) {
    console.error('Error running migrations:', error);
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
