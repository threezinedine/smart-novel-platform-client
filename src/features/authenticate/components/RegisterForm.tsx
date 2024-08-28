import React from "react";
import Form from "components/forms";
import {
	RequiredRule,
	LengthRangeRule,
	MatchFieldRule,
} from "components/forms/rules";

const RegisterForm: React.FC = () => {
	return (
		<Form
			inputs={[
				{
					name: "username",
					testId: "username",
					validations: [LengthRangeRule(8, 30)],
				},
				{
					name: "password",
					testId: "password",
					type: "password",
					validations: [LengthRangeRule(8, 30)],
				},
				{
					name: "valid",
					testId: "password-valid",
					validations: [RequiredRule, MatchFieldRule("password")],
				},
			]}
		/>
	);
};

export default RegisterForm;
