const shortid = require("shortid");
const User = require("../model/auth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJwtToken = (id) => {
	return jwt.sign({ _id: id }, process.env.JWT_SECRET, { expiresIn: "2d" });
};

exports.signupUser = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	User.find({ email: email }).exec((error, foundUserWithSameEmail) => {
		if (error) return res.status(400).json({ error });
		if (foundUserWithSameEmail.length) {
			return res.status(400).json({ message: "User with email already exists" });
		}
	});

	const username = `${firstName.substr(0, 3)}${lastName.substr(0, 3)}-${shortid.generate()}`;

	User.find({ username: username }).exec((error, foundUserWithSameUsername) => {
		if (error) return res.status(400).json({ error });
		if (foundUserWithSameUsername.length) {
			username = username + foundUserWithSameUsername.length;
		}
	});

	const hashed_password = await bcrypt.hash(password, 15);

	const userObj = {
		firstName,
		lastName,
		email,
		username,
		hashed_password,
	};

	if (req.body.contactNumber) {
		userObj.contactNumber = req.body.contactNumber;
	}

	if (req.file) {
		userObj.profilePicture = "http://localhost:2000/public/" + req.file.filename;
	}

	const signupUser = new User(userObj);

	signupUser.save((error, createdUser) => {
		if (error) return res.status(400).json({ error });

		if (createdUser) {
			const token = generateJwtToken(createdUser._id);

			const { _id, firstName, lastName, email, username } = createdUser;

			return res.status(201).json({ token, user: { _id, firstName, lastName, email, username } });
		}
	});
};

//sign in with email
exports.signinUser = (req, res) => {
	const { email, password } = req.body;
	User.findOne({ email: email }).exec(async (error, foundUser) => {
		if (error) return res.status(400).json({ error });
		if (foundUser) {
			const isPasswordCorrect = await foundUser.authenticate(password);

			if (isPasswordCorrect) {
				const token = generateJwtToken(foundUser._id);
				const { firstName, lastName, email, username } = foundUser;
				return res.status(200).json({
					token,
					user: { firstName, lastName, email, username },
				});
			} else {
				return res.status(400).json({ message: "Invalid username or password" });
			}
		} else {
			return res.status(500).json({ message: "Something went wrong" });
		}
	});
};
