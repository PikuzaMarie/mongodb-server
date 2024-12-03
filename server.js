const express = require("express");
const cors = require("cors");
const { connectToDb, getDb } = require("./db");
const { ObjectId } = require("mongodb");

const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());

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

const handleSuccess = (res, statusCode, data) => {
	res.status(statusCode).json(data);
};

const handleError = (res, statusCode, errMsg) => {
	res.status(statusCode).json(errMsg);
};

app.get("/profiles", (req, res) => {
	db.collection("profiles")
		.find() //returns a cursor
		.toArray()
		.then((profiles) => {
			handleSuccess(res, 200, profiles);
		})
		.catch(() => {
			handleError(res, 500, "Error fetching profiles");
		});
});

app.get("/profiles/:id", (req, res) => {
	if (ObjectId.isValid(req.params.id)) {
		const id = new ObjectId(req.params.id);
		db.collection("profiles")
			.findOne({ _id: id })
			.then((doc) => handleSuccess(res, 200, doc))
			.catch(() =>
				handleError(res, 500, "Error fetching profiles with this id")
			);
	} else {
		handleError(res, 500, "Wrong id");
	}
});

app.post("/profiles", (req, res) => {
	db.collection("profiles")
		.insertOne(req.body)
		.then((result) => handleSuccess(res, 201, result))
		.catch(() => handleError(res, "Error creating a new profile"));
});
