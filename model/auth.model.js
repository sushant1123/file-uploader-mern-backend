const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
			min: 3,
			max: 20,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			min: 7,
			max: 20,
			lowercase: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			index: true,
			lowercase: true,
		},
		hashed_password: {
			type: String,
			required: true,
			trim: true,
		},
		contactNumber: {
			type: String,
		},
		profilePicture: {
			type: String,
		},
	},
	{ timestamps: true }
);

UserSchema.methods = {
	authenticate: async function (password) {
		return await bcrypt.compare(password, this.hashed_password);
	},
};

module.exports = mongoose.model("User", UserSchema);
