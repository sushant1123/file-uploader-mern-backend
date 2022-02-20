const express = require("express");

const { home, fileUploader } = require("../controller/file-uploader");
const { requireSignIn } = require("../middlewares/requireSignIn");
const { upload } = require("../middlewares/multer");

const router = express.Router();

router.get("/", home);

router.post("/uploadfile", requireSignIn, upload.single("pic"), fileUploader);

module.exports = router;
