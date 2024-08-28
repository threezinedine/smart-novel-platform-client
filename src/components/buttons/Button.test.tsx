import { screen, fireEvent } from "@testing-library/react";
import Button from ".";
import renderWithMemoryRoute from "utils/renderWithMemoryRoute";

describe("Button testing", () => {
	const renderButton = (props: any) =>
		renderWithMemoryRoute(<Button {...props} />);

	it("should call the onClick function when click the button", () => {
		let callback = jest.fn();
		renderButton({ text: "Click me", onClick: callback });

		fireEvent.click(screen.getByText("Click me"));

		expect(callback).toBeCalledTimes(1);
	});

	it("should not raise error when onClick is not provided", () => {
		renderButton({ text: "Click me" });

		fireEvent.click(screen.getByText("Click me"));
	});

	it("should provide the default text is Button", () => {
		renderButton({});

		expect(screen.getByText("Button")).toBeInTheDocument();
	});

	it("should navigate to any route when click the button", () => {
		renderButton({ text: "Click me", to: "/dashboard" });

		fireEvent.click(screen.getByText("Click me"));

		expect(screen.getByText("Dashboard")).toBeInTheDocument();
	});

	it("should can pass the testId to the button", () => {
		renderButton({ text: "Click me", testId: "test" });

		expect(screen.getByTestId("test")).toBeInTheDocument();
	});
});

export default renderWithMemoryRoute;
