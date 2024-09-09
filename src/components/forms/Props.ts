import { InputValidationFunc, OnSubmitFunc } from "./types";

interface InputProps {
	name: string;
	testId: string;
	label?: string;
	validations?: InputValidationFunc[];
	type?: string;
	placeholder?: string;
	default?: string;
	readonly?: boolean;
}

interface FormProps {
	title?: string;
	inputs: InputProps[];
	submitFunc?: OnSubmitFunc;
}

export type { InputProps };

export default FormProps;
