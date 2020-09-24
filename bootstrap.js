const express       = require('express');
const morgan        = require('morgan');
const cors          = require('cors');
const app           = express();
const socketServer  = require('http').createServer(app);
const socket        = require('socket.io');

// constants
const environment = process.env.NODE_ENV
const port        = process.env.APP_PORT

const io = socket(socketServer);

// set middlewares
app.use(morgan(environment == 'local' ? 'dev' : 'combined'));
app.use(cors());
app.use(express.json());

// init port
if (!port) {
    console.log('Please set a valid port');
    return
}

app.set('port', port);

// init app
socketServer.listen(app.get('port'), () => {
    console.log(`Server API is running at port ${port}`)
});

module.exports = {
    app,
    io
}
