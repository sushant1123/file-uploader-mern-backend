const express = require("express");
const { signupUser, signinUser } = require("../controller/auth");
const router = express.Router();
const { upload } = require("../middlewares/multer");

router.post("/user/signup", upload.single("profilePicture"), signupUser);
router.post("/user/signin", signinUser);

module.exports = router;
