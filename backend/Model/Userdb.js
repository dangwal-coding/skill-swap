const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	createdAt: { type: Date, default: Date.now },
	posts: { type: Number, default: 0 },
	followers: { type: Number, default: 0 },
	following: { type: Number, default: 0 },
	professionalBio: { type: String, default: '' },
	state: { type: String, default: '' },
	country: { type: String, default: '' },
});

module.exports = mongoose.model('UserProfile', userProfileSchema);