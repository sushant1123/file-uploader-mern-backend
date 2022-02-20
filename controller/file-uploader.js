const shortid = require("shortid");
const FileUpload = require("../model/file-uploader.model");
const fs = require("fs");
const path = require("path");

exports.home = (req, res) => {
	return res.status(200).json({ message: "from home" });
};

exports.fileUploader = async (req, res) => {
	console.log(req.file);

	const obj = {
		url: "http://localhost:2000/public/" + req.file.filename,
	};

	obj.createdBy = req.user._id;

	//create an object with model
	const fileObj = new FileUpload(obj);

	// const filePath = path.join(path.dirname(__dirname), `./uploads/${req.file.filename}`);
	// console.log(filePath);

	//save that object in the db
	fileObj.save(async (error, createdFileObj) => {
		if (error) {
			//tryout
			await fs.unlink(req.file.path, (err) => {
				if (err) {
					console.log(err);
					// - return
					return res.status(400).json({ err });
				}
			});
			//tryout end

			return res.status(400).json({ error });
		}
		if (createdFileObj) return res.status(201).json({ createdFileObj });
	});
};
