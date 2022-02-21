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

exports.deleteFileFromAWSConsole = async (url) => {
	console.log(url);
	let params = { Bucket: "file-uploader-app-bucket", Key: url };
	try {
		await awsS3.headObject(params).promise();
		console.log("File Found in aws S3");
		try {
			await awsS3.deleteObject(params).promise();
			console.log("file deleted Successfully");
		} catch (err) {
			console.log("ERROR in file Deleting : " + JSON.stringify(err));
		}
	} catch (err) {
		console.log("File not Found ERROR : " + err);
	}
};
