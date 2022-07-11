const {assert} = require("chai");
const generateId = require("../api/helpers/generateId");

describe("generateId", function () {
	it("it should return random id", async function () {
		let inputs = {
			identity: "msg",
		};
		let result = await generateId.fn({identity: "msg"});

		assert.isString(result, "oops it failed");
	});
});
