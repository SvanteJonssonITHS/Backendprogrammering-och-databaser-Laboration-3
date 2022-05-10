let socketIO;

const DiceModel = require('../models/Dice');

exports.websocketRoutes = (io) => {
	socketIO = io;

	socketIO.on('connection', (socket) => {
		socket.on('message', async (data) => {
			io.emit('message', data);
		});
		socket.on('diceRoll', async (user, value) => {
			if (user && value) {
				console.log('Emit dice roll');
				// Create new dice roll object
				const diceRoll = new DiceModel({
					user: user,
					value: value
				});

				// Save new dice roll to the database
				diceRoll.save();

				// Emit dice roll to all clients
				socketIO.emit('diceRoll', { user, value });
			}
		});
	});
};
