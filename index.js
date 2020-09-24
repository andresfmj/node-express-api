const env       = require('dotenv');
env.config();

const { app, io }       = require('./bootstrap');

const { onConnection } = require('./events/socket')

// set routes
const routes    = require('./routes/index');

// set events
io.on('connection', onConnection)


// connect the database
require('./database');


// initialize routes
app.use('/', routes);

