let socketIO;

exports.websocketRoutes = (io) => {
	socketIO = io;

	socketIO.on('connection', (socket) => {
		socket.on('message', async (data) => {
			io.emit('message', data);
		});
	});
};

exports.emitDiceRoll = (data) => {
	socketIO.emit('diceRoll', data);
};
