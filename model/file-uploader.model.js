const mongoose = require("mongoose");

const fileUploaderSchema = new mongoose.Schema(
	{
		url: {
			type: String,
			required: true,
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("File-Upload", fileUploaderSchema);
