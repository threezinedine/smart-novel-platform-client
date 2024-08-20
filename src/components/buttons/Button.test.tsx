import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Button from ".";

describe("Button testing", () => {
	const renderButton = (props: any) =>
		render(
			<MemoryRouter initialEntries={["/"]}>
				<Routes>
					<Route path="/" element={<Button {...props} />} />
					<Route path="/dashboard" element={<div>Dashboard</div>} />
				</Routes>
			</MemoryRouter>
		);

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
