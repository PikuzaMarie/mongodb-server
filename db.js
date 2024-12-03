const { MongoClient } = require("mongodb");

const URL = "mongodb://localhost:27017/profiles_management";

let dbConnection;

module.exports = {
	connectToDb: (callback) => {
		MongoClient.connect(URL)
			.then((client) => {
				console.log("Connected to MongoDB");
				dbConnection = client.db();
				return callback();
			})
			.catch((err) => {
				return callback(err);
			});
	},
	getDb: () => dbConnection,
};
