import { InputValidationFunc } from "../types";

const DigitOnlyRule: InputValidationFunc = (value) => {
	const regex = /^[0-9]*$/;

	return regex.test(value) ? null : "Only digits are allowed";
};

export default DigitOnlyRule;
