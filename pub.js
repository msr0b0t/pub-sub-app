const redis = require('redis');

// Create publisher
const pub = redis.createClient();

function sendMessage() {
	pub.publish('my-channel', 'Hello there!');
}

setInterval(sendMessage, 1000);
