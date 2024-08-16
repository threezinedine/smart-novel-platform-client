import { render, screen, act } from "@testing-library/react";
import Toast from ".";
import ToastService from "services/toast";

describe("Toast testing", () => {
	it("should has no toast is presented", () => {
		render(<Toast />);
		expect(screen.queryByTestId("toast-success")).toBeNull();
		expect(screen.queryByTestId("toast-error")).toBeNull();
		expect(screen.queryByTestId("toast-info")).toBeNull();
		expect(screen.queryByTestId("toast-warning")).toBeNull();
	});

	it("should has toast is presented when the toast service adds a new message", () => {
		const errorMessage = "This is an error message";

		render(<Toast />);

		act(() => {
			ToastService.getInstance().addMessage({
				type: "error",
				message: errorMessage,
			});
		});

		expect(screen.getByTestId("toast-error")).toBeInTheDocument();
		expect(screen.getByText(errorMessage)).toBeInTheDocument();
	});
});
