const path = require("path");
const multer = require("multer");
const shortid = require("shortid");

const multerStorage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, path.join(path.dirname(__dirname), "uploads"));
	},
	filename: (req, file, callback) => {
		callback(null, shortid.generate() + "-" + file.originalname);
	},
});

exports.upload = multer({ storage: multerStorage });
