import LocalStorage from ".";

describe("Testing local storage", () => {
	it("when get not exist key should return default", () => {
		const result = LocalStorage.loadItem("non-existed-key", "default");
		expect(result).toBe("default");
	});

	it("when get exist key should return the value", () => {
		LocalStorage.setItem("key", "value");

		expect(LocalStorage.loadItem("key", "default")).toBe("value");
		expect(LocalStorage.contains("key")).toBe(true);
	});

	it("when clear all items then there is no item", () => {
		LocalStorage.setItem("key", "value");
		LocalStorage.setItem("key2", "value2");

		LocalStorage.clear();

		expect(LocalStorage.loadItem("key", "default")).toBe("default");
		expect(LocalStorage.contains("key")).toBe(false);
	});

	it("should delete item", () => {
		LocalStorage.setItem("key", "value");
		LocalStorage.setItem("key2", "value2");

		LocalStorage.deleteItem("key");

		expect(LocalStorage.contains("key")).toBe(false);
		expect(LocalStorage.contains("key2")).toBe(true);
	});

	it("should throw no error when delete non-existed item", () => {
		LocalStorage.deleteItem("non-existed-key");
	});
});
