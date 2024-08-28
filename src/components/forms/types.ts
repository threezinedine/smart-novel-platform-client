type ValueType = string;
type ErrorType = string | null | undefined;

type FormData = { [key: string]: ValueType };
type FormError = { [key: string]: ErrorType };

type InputValidationFunc = (
	value: string,
	formData?: FormData
) => string | null | undefined;

type OnSubmitFunc = (data: FormData) => void;

export type {
	FormData,
	FormError,
	ValueType,
	ErrorType,
	InputValidationFunc,
	OnSubmitFunc,
};
