const mongoose = require('mongoose');

const dice = new mongoose.Schema({
	user: {
		type: String,
		required: true,
		trim: true
	},
	value: {
		type: Number,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	expireAt: {
		type: Date,
		default: Date.now,
		expires: 86400
	}
});

module.exports = mongoose.model('dice', dice);
