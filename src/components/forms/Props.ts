import { InputValidationFunc } from "./types";

interface InputProps {
	name: string;
	testId: string;
	validations?: InputValidationFunc[];
	type?: string;
}

type ValueType = string;
type ErrorType = string | null | undefined;

interface InputComponentRef {
	validateFunction: () => void;
}

type Data = { [key: string]: string };
type Error = { [key: string]: ErrorType };
type OnSubmitFunc = (data: Data) => void;

interface FormProps {
	inputs: InputProps[];
	submitFunc?: OnSubmitFunc;
}

export type {
	InputProps,
	ValueType,
	ErrorType,
	InputComponentRef,
	Data,
	Error,
	OnSubmitFunc,
};

export default FormProps;
