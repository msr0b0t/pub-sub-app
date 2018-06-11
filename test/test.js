/* eslint-env node, mocha */
const assert = require('assert');
const mongoose = require('mongoose');
const publisher = require('../pub');
const subscriber = require('../sub');

mongoose.connect('mongodb://localhost:27017/pub-sub-db');

const Message = require('../models/message');

describe('Pub-Sub', () => {
	before(done => {
		Message.remove({}).exec().then(() => {
			done();
		});
	});
	after(() => {
		clearInterval(publisher.interval);
		subscriber.sub.unsubscribe();
		publisher.pub.quit();
		subscriber.sub.quit();
		mongoose.connection.close();
		console.log('OK');
		process.exit(0);
	});
	it('should receive message', () => {
		const subRes = subscriber.listenToMessage();
		assert.notEqual(subRes, undefined, 'Subscriber is receiving');
	});
	it('should subscribe to channel', () => {
		const subRes = subscriber.subscribeToChannel();
		assert.notEqual(subRes, undefined, 'Subscriber is subscribed');
	});
	// It('should subscribe to the channel', done => {
	// 	subscriberModule.sub.on('message', (channel, message) => {
	// 		console.log(`Received the following message from ${channel}: ${message}`);
	// 		assert.notEqual(message, undefined, 'Message exists');
	// 		assert.notEqual(channel, undefined, 'Channel exists');
	// 		// Done();
	// 	});
	// 	subscriberModule.sub.subscribe('my-channel', message => {
	// 		console.log(2, 'Subscribed to my-channel', message);
	// 		// Assert.notEqual(message, undefined, 'Message exists');
	// 		done();
	// 	});
	// });
	it('should publish a message to the channel', () => {
		const pubRes = publisher.sendMessage();
		assert.equal(pubRes, 1, 'Result should be 1');
	});
	// It('should receive message', done => {
	// 	subscriberModule.sub.on('message', (channel, message) => {
	// 		console.log(`Received the following message from ${channel}: ${message}`);
	// 		assert.notEqual(message, undefined, 'Message exists');
	// 		assert.notEqual(channel, undefined, 'Channel exists');
	// 		done();
	// 	});
	// });
	it('should push message to db', done => {
		Message.find({}).then(messages => {
			assert(messages.length > 0);
			done();
		});
	});
});
