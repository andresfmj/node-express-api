const express   = require('express');
const morgan    = require('morgan');
const cors      = require('cors');
const env       = require('dotenv');
env.config();

const app       = express();

// constants
const environment = process.env.NODE_ENV
const port        = process.env.APP_PORT

// set routes


// set events


// connect the database


// set middlewares
app.use(morgan(environment == 'local' ? 'dev' : 'combined'));
app.use(cors());
app.use(express.json());


// initialize routes
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'API Rest'
    })
})

// init port
if (!port) {
    console.log('Please set a valid port');
    return
}

app.set('port', port);

// init app
app.listen(app.get('port'), 
    () => console.log(`Server API is running at port ${port}`));

