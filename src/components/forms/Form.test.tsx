import { screen, fireEvent } from "@testing-library/react";
import Form from ".";
import { InputProps } from "./Props";
import { RequiredRule, MinLengthRule, MatchFieldRule } from "./rules";
import { OnSubmitFunc } from "./types";
import renderWithMemoryRoute from "utils/renderWithMemoryRoute";

describe("Form testing", () => {
	const submitFunc: OnSubmitFunc = jest.fn();
	const error = "This field is required";
	const title = "Form";

	const inputs: InputProps[] = [
		{
			name: "username",
			testId: "username",
			validations: [RequiredRule],
		},
		{
			name: "password",
			testId: "password",
			type: "password",
		},
		{
			name: "valid",
			testId: "password-valid",
			validations: [MatchFieldRule("password")],
		},
		{
			name: "checkLessThan",
			testId: "checkLessThan",
			validations: [MinLengthRule(5)],
		},
		{
			name: "default",
			testId: "default",
			default: "default",
			readonly: true,
		},
	];

	it("should have the list of inputs for list of incomming props", () => {
		renderWithMemoryRoute(<Form inputs={inputs} title={title} />);

		const usernameInput = screen.getByTestId("username");
		const passwordInput = screen.getByTestId("password");
		const submitButton = screen.getByTestId("submit");

		expect(screen.getByTestId("form-title")).toHaveTextContent(title);
		expect(usernameInput).toBeInTheDocument();
		expect(usernameInput.getAttribute("type")).toBe("text");

		expect(passwordInput).toBeInTheDocument();
		expect(passwordInput.getAttribute("type")).toBe("password");

		expect(submitButton).toBeInTheDocument();
	});

	it("should not contain the title when the title is not provided", () => {
		renderWithMemoryRoute(<Form inputs={inputs} />);

		expect(screen.queryByTestId("form-title")).toBeNull();
	});

	it("should print the error when hover and blur the input with required validation", () => {
		renderWithMemoryRoute(<Form inputs={inputs} />);

		const usernameInput = screen.getByTestId("username");
		fireEvent.focus(usernameInput);
		fireEvent.blur(usernameInput);

		expect(screen.getByText(error)).toBeInTheDocument();
	});

	it("should show validate all inputs when click submit", () => {
		renderWithMemoryRoute(<Form inputs={inputs} />);
		fireEvent.click(screen.getByTestId("submit"));

		const errorElements = screen.getAllByText(error);
		expect(errorElements.length).toBeGreaterThan(0);
	});

	it("should remove error when input is valid", () => {
		renderWithMemoryRoute(<Form inputs={inputs} />);

		const usernameInput = screen.getByTestId("username");

		fireEvent.change(usernameInput, { target: { value: "testing" } });
		fireEvent.blur(usernameInput);
		expect(screen.queryByText(error)).toBeNull();
	});

	it("should cannot submit where there is an error", () => {
		renderWithMemoryRoute(<Form inputs={inputs} submitFunc={submitFunc} />);

		fireEvent.input(screen.getByTestId("username"), "testing");
		fireEvent.click(screen.getByTestId("submit"));

		expect(submitFunc).not.toBeCalled();
	});

	it("should call the submit function when all inputs are valid", () => {
		renderWithMemoryRoute(<Form inputs={inputs} submitFunc={submitFunc} />);

		fireEvent.change(screen.getByTestId("username"), {
			target: { value: "testing" },
		});
		fireEvent.change(screen.getByTestId("checkLessThan"), {
			target: { value: "testingminlength" },
		});
		fireEvent.blur(screen.getByTestId("checkLessThan"));
		fireEvent.click(screen.getByTestId("submit"));

		// should be call with the value of the inputs
		expect(submitFunc).toBeCalledWith({
			username: "testing",
			password: "",
			checkLessThan: "testingminlength",
			valid: "",
			default: "default",
		});
	});

	it("should not raise error when must match field matches", () => {
		renderWithMemoryRoute(<Form inputs={inputs} submitFunc={submitFunc} />);

		fireEvent.change(screen.getByTestId("password"), {
			target: { value: "password" },
		});

		fireEvent.change(screen.getByTestId("password-valid"), {
			target: { value: "password" },
		});

		expect(screen.queryByTestId("error")).toBeNull();
	});

	it("should raise error when must match field does not match", () => {
		renderWithMemoryRoute(<Form inputs={inputs} submitFunc={submitFunc} />);

		fireEvent.change(screen.getByTestId("password"), {
			target: { value: "password" },
		});

		fireEvent.change(screen.getByTestId("password-valid"), {
			target: { value: "password-wrong" },
		});
		fireEvent.blur(screen.getByTestId("password-valid"));

		expect(screen.getByTestId("error")).toBeInTheDocument();
	});

	it("should have the default value for the default input", () => {
		renderWithMemoryRoute(<Form inputs={inputs} />);

		const defaultInput = screen.getByTestId("default");
		expect(defaultInput.getAttribute("value")).toBe("default");
		expect(defaultInput.getAttribute("readonly")).toBe("");
	});
});
