import { InputValidationFunc } from "../types";

export default function LengthRangeRule(
	minLength: number,
	maxLength: number
): InputValidationFunc {
	return (value: string) => {
		if (value.length < minLength) {
			return `The value must be at least ${minLength} characters long`;
		}
		if (value.length > maxLength) {
			return `The value must be at most ${maxLength} characters long`;
		}
		return null;
	};
}
