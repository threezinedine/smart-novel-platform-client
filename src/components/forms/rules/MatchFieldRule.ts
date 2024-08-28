import { JSONDict } from "data/styles";
import { InputValidationFunc } from "../types";

export default function MatchFieldRule(fieldName: string): InputValidationFunc {
	return (value: string, formData?: JSONDict) => {
		if (!formData) {
			return null;
		}
		if (value !== formData![fieldName]) {
			return `The value must be the same as ${fieldName}`;
		}
		return null;
	};
}
