import { InputValidationFunc, OnSubmitFunc } from "./types";

interface InputProps {
	name: string;
	testId: string;
	validations?: InputValidationFunc[];
	type?: string;
	placeholder?: string;
}

interface FormProps {
	title?: string;
	inputs: InputProps[];
	submitFunc?: OnSubmitFunc;
}

export type { InputProps };

export default FormProps;
