type FormData = { [key: string]: string };

type InputValidationFunc = (
	value: string,
	formData?: FormData
) => string | null | undefined;

export type { FormData, InputValidationFunc };
