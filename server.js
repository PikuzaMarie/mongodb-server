const express = require("express");
const cors = require("cors");
const { connectToDb, getDb } = require("./db");

const PORT = 3000;

const app = express();
app.use(cors());

let db;

connectToDb((err) => {
	if (!err) {
		app.listen(PORT, (err) => {
			err
				? console.log(err)
				: console.log(`Server is listening on port ${PORT}`);
		});
		db = getDb();
	} else {
		console.log(`Error connection to db: ${err}`);
	}
});
