const redis = require('redis');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/pub-sub-db');

const Message = require('./models/message');

// Create subscriber
const sub = redis.createClient();
exports.sub = sub;

function listenToMessage() {
	return sub.on('message', (channel, message) => {
		console.log(`Received the following message from ${channel}: ${message}`);
		// Add message to db
		Message.create({message});
	});
}
exports.listenToMessage = listenToMessage;

// Subscribe to a channel
function subscribeToChannel() {
	return sub.subscribe('my-channel', message => {
		console.log('Subscribed to my-channel');
		console.log(message);
	});
}
exports.subscribeToChannel = subscribeToChannel;
