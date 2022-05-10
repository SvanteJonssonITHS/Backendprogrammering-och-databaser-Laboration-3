let socketIO;

const DiceModel = require('../models/Dice');
const MessageModel = require('../models/Message');

exports.websocketRoutes = (io) => {
	socketIO = io;

	socketIO.on('connection', (socket) => {
		socket.on('message', async (user, value) => {
			if (user && value) {
				// Create a new message object
				const message = new MessageModel({
					user: user,
					value: value
				});

				// Save the message to the database
				await message.save();

				// Emit the message to all connected clients
				socketIO.emit('message', message);
			}
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
				socketIO.emit('diceRoll', diceRoll);
			}
		});
	});
};
