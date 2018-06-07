const redis = require('redis');

// Create subscriber
const sub = redis.createClient();

sub.on('message', (channel, message) => {
	console.log(`Received the following message from ${channel}: ${message}`);
});

const channel = 'my-channel';

// Subscribe to a channel
sub.subscribe('my-channel', message => {
	console.log('Subscribed to my-channel');
	console.log(message);
});
