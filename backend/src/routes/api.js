// External Dependencies
const express = require('express');

// Internal Dependencies
const DiceModel = require('../models/Dice');

// Variable declaration
const router = express.Router();

router.get('/', async (_req, res) => {
	res.json({
		success: true,
		message: 'Welcome to the API'
	});
});

router.get('/diceRolls', async (req, res) => {
	const limit = req.query.limit ? req.query.limit : 0;

	try {
		let allDiceRolls = await DiceModel.find().sort({ value: -1 }).limit(limit);
		res.status(200).json({
			success: true,
			message: 'Dice rolls fetched successfully',
			error: '',
			data: allDiceRolls
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Failed to fetch dice rolls',
			error: error.message || 'Something went wrong retrieving all dice rolls',
			data: []
		});
	}
});

module.exports = router;
