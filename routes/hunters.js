const express = require('express');
const router = express.Router();

const { GetFriends, GetRandom } = require('../controllers/huntersCtrl');


router.get('/friends', async (req, res) => {
	const { user, hunterSelected } = req.body;

	if (!user || !hunterSelected) {
		return res.status(406).json({
			error: true,
			message: 'user, hunterSelected are required parameters',
		});
	}
	
	if (!user.friends || user.friends.length == 0) {
		return res.status(406).json({
			error: true,
			message: 'user does not have any friends'
		})
	}
	
	const hunters = await GetFriends(user, hunterSelected);
	
	if (hunters) {
		res.status(200).json({
			error: hunters.length > 0 ? false : true,
			message: '',
			rows: hunters.length,
			results: hunters
		})
	} else {
		res.status(404).json({
			error: true,
			message: 'Hunter selected not found'
		})
	}

});


router.get('/random', async (req, res) => {
    const { user, hunterSelected } = req.body;

    if (!hunterSelected) {
		return res.status(406).json({
			error: true,
			message: 'hunterSelected is a required parameter',
		});
	}
	
	const hunters = await GetRandom(user, hunterSelected);

	if (hunters) {
		res.status(200).json({
			error: false,
			message: '',
			results: hunters
		})
	} else {
		res.status(404).json({
			error: true,
			message: 'Hunter not found'
		})
	}

})

module.exports = router;
