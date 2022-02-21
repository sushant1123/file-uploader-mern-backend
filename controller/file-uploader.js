const shortid = require("shortid");
const FileUpload = require("../model/file-uploader.model");
const { deleteFileFromAWSConsole } = require("../middlewares/multer");
const fs = require("fs");
const path = require("path");

exports.home = (req, res) => {
	return res.status(200).json({ message: "from home" });
};

exports.fileUploader = async (req, res) => {
	try {
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
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
};

exports.getImagesByUser = async (req, res) => {
	try {
		const { _id } = req.user;

		FileUpload.find({ createdBy: _id }).exec((error, files) => {
			if (error) return res.status(400).json({ error });

			if (files) return res.status(200).json({ files });
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
};

exports.deleteImageById = async (req, res) => {
	try {
		const { fileId } = req.body.payload;
		let url;
		if (fileId) {
			FileUpload.findOneAndDelete({ _id: fileId, createdBy: req.user._id }).exec((error, fileDoc) => {
				if (error) return res.status(400).json({ error });
				if (fileDoc) {
					const filename = fileDoc.url.split(".com/")[1];
					console.log(filename);

					deleteFileFromAWSConsole(filename);
					return res.status(202).json({ message: "file deleted successfully." });
				} else {
					return res
						.status(404)
						.json({ message: "file not found or you are not authorized to delete this file." });
				}
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
};
