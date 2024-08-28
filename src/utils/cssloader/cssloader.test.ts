import { Styles } from "data/styles";
import CssLoader from ".";

describe("cssloader test from .module.scss file", () => {
	const styles: Styles = {
		test: "test-classes",
		css: "css-classes",
	};

	const loader = new CssLoader(styles);

	it("should load css name from the dict", () => {
		const result: string = loader.load("test");

		expect(result).toBe(styles.test);
	});

	it("should connects the css name to the final class name", () => {
		const result: string = loader.load("test", "css");

		expect(result).toBe(`${styles.test} ${styles.css}`);
	});

	it("should ignore the empty string", () => {
		const result: string = loader.load("", "test", "css");

		expect(result).toBe(`${styles.test} ${styles.css}`);
	});

	it("should ignore the empty string at the middle", () => {
		const result: string = loader.load("test", "", "css");

		expect(result).toBe(`${styles.test} ${styles.css}`);
	});

	it("should ignore the empty string at the end", () => {
		const result: string = loader.load("test", "css", "");

		expect(result).toBe(`${styles.test} ${styles.css}`);
	});

	it("should ignore or null", () => {
		const result: string = loader.load("test", "css", null);

		expect(result).toBe(`${styles.test} ${styles.css}`);
	});

	it("should keep the valid key but non-existing css name", () => {
		const result: string = loader.load("test", "non-existing-css");

		expect(result).toBe(`${styles.test} non-existing-css`);
	});

	it("should keep the non-existing key at the beggining", () => {
		const result: string = loader.load("non-existing-css", "test");

		expect(result).toBe(`non-existing-css ${styles.test}`);
	});

	it("should keep the non-existing key at the middle", () => {
		const result: string = loader.load("test", "non-existing-css", "css");

		expect(result).toBe(`${styles.test} non-existing-css ${styles.css}`);
	});
});
