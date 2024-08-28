import { render, screen, fireEvent } from "@testing-library/react";
import Toggle from "./Toggle";

describe("Toggle testing", () => {
	it("should render toggle with current value is off", () => {
		let value = false;

		render(<Toggle value={value} onChange={(e) => (value = e)} />);

		expect(screen.getByTestId("toggle-off")).toBeInTheDocument();
	});

	it("should render toggle with current value is on", () => {
		let value = true;

		render(<Toggle value={value} />);

		expect(screen.getByTestId("toggle-on")).toBeInTheDocument();
	});

	it("should change the value when clicked", () => {
		let value = false;
		render(
			<Toggle
				testId="toggle"
				value={value}
				onChange={(e) => (value = e)}
			/>
		);

		fireEvent.click(screen.getByTestId("toggle"));

		expect(value).toBe(true);
	});

	it("should have default value false", () => {
		render(<Toggle />);

		expect(screen.getByTestId("toggle-off")).toBeInTheDocument();
	});
});
