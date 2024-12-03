const { MongoClient } = require("mongodb");

const URL = "mongodb://localhost:27017/profiles_management";

module.exports = {
	connectToDb: async () => {
		try {
			const client = await MongoClient.connect(URL);
			console.log("Connected to MongoDb");
			dbConnection = client.db();
		} catch (err) {
			console.error("Failed to connect to MongoDb", err);
			throw err;
		}
	},
	getDb: () => dbConnection,
};
