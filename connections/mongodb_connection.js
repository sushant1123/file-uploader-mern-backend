const mongoose = require("mongoose");

exports.connection = async (username, password, dbname) => {
	try {
		const mongodb_url = `mongodb+srv://${username}:${password}@cluster0.hxqnm.mongodb.net/${dbname}?retryWrites=true&w=majority`;

		await mongoose.connect(mongodb_url, {
			useNewURLParser: true,
			useUnifiedTopology: true,
		});

		console.log("database connected successfully....!");
	} catch (error) {
		console.log(error);
	}
};
