import KeyOmitter from ".";

describe("KeyOmitter", () => {
	const obj = {
		a: 1,
		b: 2,
		c: 3,
	};

	const keyOmitter = KeyOmitter(obj);

	it("should except listed keys", () => {
		expect(keyOmitter.except("a")).toEqual({
			b: 2,
			c: 3,
		});

		expect(keyOmitter.except("b")).toEqual({
			a: 1,
			c: 3,
		});
	});

	it("should ignore the key that does not exist", () => {
		expect(keyOmitter.except("d")).toEqual(obj);
	});

	it("can ignore 2 or more keys", () => {
		expect(keyOmitter.except("a", "b")).toEqual({
			c: 3,
		});
	});
});
