import { InputValidationFunc, OnSubmitFunc } from "./types";

interface InputProps {
	name: string;
	testId: string;
	validations?: InputValidationFunc[];
	type?: string;
}

interface FormProps {
	inputs: InputProps[];
	submitFunc?: OnSubmitFunc;
}

export type { InputProps };

export default FormProps;
