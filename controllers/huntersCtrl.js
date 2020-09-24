const mongoose    = require('mongoose');

const HunterModel = require('../models/hunter');


const GetFriends = async (user, hunterSelected) => {
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
        return hunters
    } else {
        return null
    }
}

const GetRandom = async (user, hunterSelected) => {
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
        return hunters
    } else {
        return null
    }
}


module.exports = {
    GetFriends,
    GetRandom
};
