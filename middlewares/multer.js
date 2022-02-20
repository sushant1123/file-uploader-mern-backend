const path = require("path");
const multer = require("multer");
const shortid = require("shortid");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const _env = require("dotenv");

_env.config();

const accessKeyId = process.env.ACCESSKEYID;
const secretAccessKey = process.env.SECRETACCESSKEY;

const awsS3 = new aws.S3({
	accessKeyId,
	secretAccessKey,
});

//simple multer using disk-storage
// const multerStorage = multer.diskStorage({
// 	destination: (req, file, callback) => {
// 		callback(null, path.join(path.dirname(__dirname), "uploads"));
// 	},
// 	filename: (req, file, callback) => {
// 		callback(null, shortid.generate() + "-" + file.originalname);
// 	},
// });

// multer using aws-storage

// const multerS3Storage = multerS3({
// 	s3: awsS3,
// 	bucket: "file-uploader-app-bucket",
// 	acl: "public-read",
// 	metadata: function (req, file, cb) {
// 		cb(null, { fieldName: file.fieldname });
// 	},
// 	key: function (req, file, cb) {
// 		cb(null, shortid.generate() + "-" + file.originalname);
// 	},
// });

exports.uploadS3 = multer({
	storage: multerS3({
		s3: awsS3,
		bucket: "file-uploader-app-bucket",
		acl: "public-read",
		metadata: function (req, file, cb) {
			cb(null, { fieldName: file.fieldname });
		},
		key: function (req, file, cb) {
			cb(null, shortid.generate() + "-" + file.originalname);
		},
	}),
});

// exports.uploadS3 = multer({ storage: multerS3Storage });
// exports.upload = multer({ storage: multerStorage });
