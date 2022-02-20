const express = require("express");
const { signupUser, signinUser } = require("../controller/auth");
const router = express.Router();
const { uploadS3 } = require("../middlewares/multer");

router.post("/user/signup", uploadS3.single("profilePicture"), signupUser);
router.post("/user/signin", signinUser);

module.exports = router;
