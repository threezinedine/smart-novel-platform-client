import { InputValidationFunc } from "../types";

const MaxLengthRule =
	(length: number): InputValidationFunc =>
	(value: string) => {
		if (value.length > length) {
			return `Value is too long, max length is ${length}`;
		}

		return null;
	};

export default MaxLengthRule;
