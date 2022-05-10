// Import dotenv
require('dotenv').config();

// External dependencies
const express = require('express');
const http = require('http');
const path = require('path');

// Internal dependencies
const { connectToMongoDB } = require('./config/mongoConnection');
const { socketIOSetup } = require('./config/socketioConnection');

//Variable declaration
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use((err, _req, res, _next) => {
	res.status(400).json({
		success: false,
		error: err.message
	});
});

// Routes
app.use('/api', require('./routes/api.http.js'));

// Serve static files from the Vue app
app.use('/', express.static(path.join(path.resolve(), '../frontend/dist')));

// Connects to MongoDB
connectToMongoDB();

// Connects to SocketIO
const server = http.createServer(app);
socketIOSetup(server);

// Starts the server
server.listen(port, () => {
	console.log(`Server is running on port ${port}\nAccess it on http://localhost:${port}`);
});
