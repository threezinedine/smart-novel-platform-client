import { screen, fireEvent } from "@testing-library/react";
import Dropdown from ".";
import renderWithMemoryRoute from "utils/renderWithMemoryRoute";

describe("Dropdown testing", () => {
	const fn = jest.fn();

	const renderDropdown = () => {
		renderWithMemoryRoute(
			<>
				<Dropdown
					items={[
						{
							text: "Item 1",
							to: "/",
							testId: "item-1",
						},
						{
							text: "Item 2",
							to: "/dashboard",
							callback: fn,
						},
					]}
				>
					<div data-testid="dropdown-trigger">Test</div>
				</Dropdown>
			</>
		);
	};

	it("should not show the menu at the beginning", () => {
		renderDropdown();

		expect(screen.getByTestId("dropdown-trigger")).toBeInTheDocument();
		expect(screen.getByTestId("dropdown-menu")).not.toHaveClass("show");
	});

	it("should show both item when clicked into the dropdown trigger", () => {
		renderDropdown();

		fireEvent.click(screen.getByTestId("dropdown-trigger"));

		expect(screen.getByTestId("dropdown-menu")).toHaveClass("show");
	});

	it("should navigate to the correct path when clicked into the item", () => {
		renderDropdown();

		fireEvent.click(screen.getByTestId("dropdown-trigger"));
		fireEvent.click(screen.getByText("Item 2"));

		expect(fn).toBeCalled();
		expect(screen.getByText("Dashboard")).toBeInTheDocument();
	});
});
