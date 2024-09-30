import { screen, fireEvent } from "@testing-library/react";

import Modal from "./Modal";
import renderWithMemoryRoute from "utils/renderWithMemoryRoute";

describe("Modal testing", () => {
	it("should not open the modal by default", () => {
		renderWithMemoryRoute(<Modal />);

		expect(screen.queryByTestId("modal-content")).not.toBeInTheDocument();
	});

	it("should open the modal when the visible prop is true", () => {
		renderWithMemoryRoute(<Modal visible={true} />);

		expect(screen.getByTestId("modal-content")).toBeInTheDocument();
	});

	it("should open the modal when the modal button is clicked", () => {
		renderWithMemoryRoute(<Modal />);

		fireEvent.click(screen.getByTestId("modal-button"));

		expect(screen.getByTestId("modal-content")).toBeInTheDocument();
	});

	it("should close the modal when click into non-modal-content area", () => {
		renderWithMemoryRoute(<Modal visible={true} />);

		fireEvent.click(screen.getByTestId("modal-background"));

		expect(screen.queryByTestId("modal-content")).not.toBeInTheDocument();
	});

	it("should contain the children inside the modal", () => {
		renderWithMemoryRoute(
			<Modal visible={true}>
				<div data-testid="child" />
			</Modal>
		);

		expect(screen.getByTestId("child")).toBeInTheDocument();
	});
});
