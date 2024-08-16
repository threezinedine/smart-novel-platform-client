import React from "react";
import Form from "components/forms";
import RequiredRule from "./RequireRule";
import { useNavigate } from "react-router-dom";
import LoginClient from "../services/LoginClient";
import { Response } from "services/request";

const LoginForm: React.FC = () => {
	const client = new LoginClient();
	const navigator = useNavigate();
	const onSubmit = async (data: any) => {
		const response: Response = await client.login(data);

		if (response.isSuccess()) {
			navigator("/dashboard");
		} else {
			console.log("error");
		}
	};

	return (
		<Form
			inputs={[
				{
					name: "username",
					testId: "username",
					validations: [RequiredRule],
				},
				{
					name: "password",
					testId: "password",
					type: "password",
					validations: [RequiredRule],
				},
			]}
			submitFunc={onSubmit}
		/>
	);
};

export default LoginForm;
