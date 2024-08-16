import { StringValidationFunc } from "data/styles";

interface InputProps {
	name: string;
	testId: string;
	validations?: StringValidationFunc[];
	type?: string;
}

type ValueType = string;
type ErrorType = string | null | undefined;

interface InputComponentProps extends InputProps {
	value: ValueType;
	setValue: (value: ValueType) => void;
	error: ErrorType;
	setError: (error: ErrorType) => void;
}

interface InputComponentRef {
	validateFunction: () => void;
}

type Data = { [key: string]: string };
type OnSubmitFunc = (data: Data) => void;

interface FormProps {
	inputs: InputProps[];
	submitFunc?: OnSubmitFunc;
}

export type {
	InputProps,
	InputComponentProps,
	ValueType,
	ErrorType,
	InputComponentRef,
	Data,
	OnSubmitFunc,
};

export default FormProps;
