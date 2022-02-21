const express = require("express");

const { home, fileUploader, getImagesByUser, deleteImageById } = require("../controller/file-uploader");
const { requireSignIn } = require("../middlewares/requireSignIn");
const { uploadS3 } = require("../middlewares/multer");

const router = express.Router();

router.get("/", home);

router.post("/uploadfile", requireSignIn, uploadS3.single("pic"), fileUploader);
router.get("/getImages", requireSignIn, getImagesByUser);
router.delete("/deleteImage", requireSignIn, deleteImageById);

module.exports = router;
