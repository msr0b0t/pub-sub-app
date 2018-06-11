const redis = require('redis');

// Create publisher
const pub = redis.createClient();
exports.pub = pub;

function sendMessage() {
	return pub.publish('my-channel', 'Hello there!');
}
exports.sendMessage = sendMessage;

const interval = setInterval(sendMessage, 1000);
exports.interval = interval;
