const shortid = require("shortid");
const FileUpload = require("../model/file-uploader.model");
const fs = require("fs");
const path = require("path");

exports.home = (req, res) => {
	return res.status(200).json({ message: "from home" });
};

exports.fileUploader = async (req, res) => {
	const obj = {
		url: req.file.location,
	};

	obj.createdBy = req.user._id;

	//create an object with model
	const fileObj = new FileUpload(obj);

	//save that object in the db
	fileObj.save(async (error, createdFileObj) => {
		if (error) {
			return res.status(400).json({ error });
		}
		if (createdFileObj) return res.status(201).json({ createdFileObj });
	});
};
