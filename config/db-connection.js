const {Client} = require("pg");

// Creating new client.
const client = new Client({
	user: "quxvizftbxbuvb",
	host: "ec2-44-206-11-200.compute-1.amazonaws.com",
	database: "dcq2n1i8brplgi",
	password: "e711394bd0e8637a240c8f6ba8cd8c9cf98c5112aab5e55d9f4c7fc1b0954a02",
	port: 5432,
	ssl: {
		rejectUnauthorized: false,
	},
});

// connection the server
client.connect(function (error) {
	if (error) throw error;
});

module.exports = {client};
