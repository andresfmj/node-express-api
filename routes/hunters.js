const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

// const UserModel     = require('../models/user');
const HunterModel = require('../models/hunter');

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
	
	const hunterSel = await HunterModel.findOne({ _id: mongoose.Types.ObjectId(hunterSelected) })

	if (hunterSel) {
		// debido a que el hunterSelected especificado en el documento User,
		// desafortunadamente no encontrará ningun cercano a su level
		const levelSup = hunterSel.level + 10
		const levelInf = hunterSel.level - 10

		const query = {
			"$and": [ 
				{
					"user": {
						"$in": user.friends.map(i => mongoose.Types.ObjectId(i))
					}
				},
				{ "level": {$gte: levelInf} }, { "level": {$lte: levelSup} }, 
				{ "locked": false } 
			]
		}

		const hunters = await HunterModel.find(query)

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
	
	const hunterSel = await HunterModel.findOne({ _id: mongoose.Types.ObjectId(hunterSelected) })

	if (hunterSel) {
		const levelSup = hunterSel.level + 10
		const levelInf = hunterSel.level - 10

		const hunters = await HunterModel.aggregate([
			{ 
				$match: { 
					$and: [ 
						{ level: {$gte: levelInf} }, { level: {$lte: levelSup} }, 
						{ _id: {$ne: hunterSel._id} }, 
						{ locked: false } 
					] 
				} 
			},
			{ $sample: { size: 10 } }
		])

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
