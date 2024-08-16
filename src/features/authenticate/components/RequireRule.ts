import { StringValidationFunc } from "data/styles";

const RequiredRule: StringValidationFunc = (value) => {
	if (!value) {
		return "This field is required";
	}
	return null;
};

export default RequiredRule;
