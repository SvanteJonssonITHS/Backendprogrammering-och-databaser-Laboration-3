const mongoose = require('mongoose');

const message = new mongoose.Schema({
	user: {
		type: String,
		required: true,
		trim: true
	},
	value: {
		type: String,
		required: true,
		trim: true
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

module.exports = mongoose.model('message', message);
