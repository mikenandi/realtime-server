const crypto = require("crypto");
module.exports = {
	friendlyName: "Generate id",

	description:
		"Helper function that will help to generate unique string which will be used as id",

	inputs: {
		identity: {
			type: "string",
			required: true,
			description: "starting code which identify that unique id.",
		},
	},

	fn: async function (inputs) {
		const generate_random_number = (min, max) => {
			// min and max included
			return Math.floor(Math.random() * (max - min + 1) + min);
		};

		// creating random rumber
		let random_number = generate_random_number(8, 64);

		//Generating random string with number generated.

		let random_string = crypto
			.randomBytes(random_number)
			.toString("base64")
			.replace(/[/\+=]/gi, "");

		// combinging every thing
		let id = inputs.identity + "_" + random_string;

		// return response which will be string.
		return id;
	},
};
