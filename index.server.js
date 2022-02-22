const express = require("express");
const app = express();
const _env = require("dotenv");
const path = require("path");
const cors = require("cors");

const PORT = process.env.PORT | 2000;

const { connection } = require("./connections/mongodb_connection");
//routes
const fileUploaderRoutes = require("./routes/file-uploader.routes");
const userRoutes = require("./routes/auth.routes");

//env variables configuration
_env.config();

//db connection
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const dbname = process.env.MONGODB_DATABASE;

connection(username, password, dbname);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use(cors());

app.use("/api", fileUploaderRoutes);
app.use("/api", userRoutes);

app.listen(PORT, () => {
	console.log(`App is listening on port ${PORT}....`);
});
