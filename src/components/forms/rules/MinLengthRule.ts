import { InputValidationFunc } from "components/forms/types";

export default function MinLengthRule(minLength: number): InputValidationFunc {
	return (value: string) => {
		if (value.length < minLength) {
			return `The value must be at least ${minLength} characters long`;
		}
		return null;
	};
}
