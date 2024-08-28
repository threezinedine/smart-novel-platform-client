import StringRandom from ".";

describe("StringRandom", () => {
	it("should return a random string which can contain numbers and letters", () => {
		const result = StringRandom(10);
		expect(result).toMatch(/^[a-zA-Z0-9]{10}$/);
	});
});
