import { render, screen, fireEvent } from "@testing-library/react";
import Form from ".";
import { StringValidationFunc } from "data/styles";
import { InputProps, OnSubmitFunc } from "./Props";

describe("Form testing", () => {
	const submitFunc: OnSubmitFunc = jest.fn();
	const error = "This field is required";
	const Required: StringValidationFunc = (value) => {
		if (!value) {
			return error;
		}
		return null;
	};

	const MaxLength: (maxLength: number) => StringValidationFunc = (
		maxLength
	) => {
		return (value) => {
			if (value.length > maxLength) {
				return `This field must be less than ${maxLength} characters`;
			}
			return null;
		};
	};

	const inputs: InputProps[] = [
		{
			name: "username",
			testId: "username",
			validations: [Required],
		},
		{
			name: "password",
			testId: "password",
			type: "password",
		},
		{
			name: "checkLessThan",
			testId: "checkLessThan",
			validations: [MaxLength(5), Required],
		},
	];

	it("should have the list of inputs for list of incomming props", () => {
		render(<Form inputs={inputs} />);

		const usernameInput = screen.getByTestId("username");
		const passwordInput = screen.getByTestId("password");
		const submitButton = screen.getByTestId("submit");

		expect(usernameInput).toBeInTheDocument();
		expect(usernameInput.getAttribute("type")).toBe("text");

		expect(passwordInput).toBeInTheDocument();
		expect(passwordInput.getAttribute("type")).toBe("password");

		expect(submitButton).toBeInTheDocument();
	});

	it("should print the error when hover and blur the input with required validation", () => {
		render(<Form inputs={inputs} />);

		const usernameInput = screen.getByTestId("username");
		fireEvent.focus(usernameInput);
		fireEvent.blur(usernameInput);

		expect(screen.getByText(error)).toBeInTheDocument();
	});

	it("should show validate all inputs when click submit", () => {
		render(<Form inputs={inputs} />);
		fireEvent.click(screen.getByTestId("submit"));

		const errorElements = screen.getAllByText(error);
		expect(errorElements.length).toBeGreaterThan(0);
	});

	it("should remove error when input is valid", () => {
		render(<Form inputs={inputs} />);

		const usernameInput = screen.getByTestId("username");

		fireEvent.change(usernameInput, { target: { value: "testing" } });
		fireEvent.blur(usernameInput);
		expect(screen.queryByText(error)).toBeNull();
	});

	it("should cannot submit where there is an error", () => {
		render(<Form inputs={inputs} submitFunc={submitFunc} />);

		fireEvent.input(screen.getByTestId("username"), "testing");
		fireEvent.click(screen.getByTestId("submit"));

		expect(submitFunc).not.toBeCalled();
	});

	it("should call the submit function when all inputs are valid", () => {
		render(<Form inputs={inputs} submitFunc={submitFunc} />);

		fireEvent.change(screen.getByTestId("username"), {
			target: { value: "testing" },
		});
		fireEvent.change(screen.getByTestId("checkLessThan"), {
			target: { value: "tes" },
		});
		fireEvent.click(screen.getByTestId("submit"));

		// should be call with the value of the inputs
		expect(submitFunc).toBeCalledWith({
			username: "testing",
			password: "",
			checkLessThan: "tes",
		});
	});
});
