import { InputValidationFunc } from "components/forms/types";

const RequiredRule: InputValidationFunc = (value: string) => {
	if (!value) {
		return "This field is required";
	}
	return null;
};

export default RequiredRule;
