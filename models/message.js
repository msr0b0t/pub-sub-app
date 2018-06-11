const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
	message: {type: String}
});

module.exports = mongoose.model('Message', messageSchema);
