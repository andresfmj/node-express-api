const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

// const UserModel     = require('../models/user');
const HunterModel = require('../models/hunter');

router.post('/', async (req, res) => {
	const { user, hunterSelected } = req.body;

	if (!user || !user.friends || !hunterSelected) {
		return res.status(406).json({
			error: true,
			message: 'user, hunterSelected are required parameters',
		});
    }
    
    const friends = user.friends.map(i => {
        return mongoose.Types.ObjectId(i)
    })

	const hunters = await HunterModel.find({
		user: {
			$in: friends,
		},
		locked: false,
    }).limit(10);
    
    console.log(hunters)


});


router.post('/random', async (req, res) => {
    const { user } = req.body

    

})

module.exports = router;
