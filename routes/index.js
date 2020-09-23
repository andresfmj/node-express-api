const express       = require('express');
const router        = express.Router();

const huntersRouter = require('./hunters');

router.use('/hunters', huntersRouter);

router.use('/', (req, res) => {
    res.send('Hunters API')
})

module.exports = router;

