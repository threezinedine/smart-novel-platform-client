import React from "react";
import Form, { OnSubmitFunc, FormData } from "components/forms";
import {
	RequiredRule,
	LengthRangeRule,
	MatchFieldRule,
} from "components/forms/rules";
import AuthenticateClient from "../services/AuthenticateClient";
import ToastService from "services/toast";
import { ResponseErrorContent } from "services/request";
import { useNavigate } from "react-router-dom";

const toastService = ToastService.getInstance();

const RegisterForm: React.FC = () => {
	const client = new AuthenticateClient();
	const navigator = useNavigate();

	const onSubmit: OnSubmitFunc = async (data: FormData) => {
		const response = await client.register(data);

		if (response.isSuccess()) {
			toastService.addMessage({
				message: "Register successfully",
				type: "success",
				duration: 4000,
			});
			navigator("/login");
		} else {
			toastService.addMessage({
				message: response.getData<ResponseErrorContent>().message,
				type: "error",
				duration: 400,
			});
		}
	};

	return (
		<Form
			title="Register"
			inputs={[
				{
					name: "username",
					testId: "username",
					validations: [LengthRangeRule(8, 30)],
					placeholder: "Enter the username",
				},
				{
					name: "password",
					testId: "password",
					type: "password",
					validations: [LengthRangeRule(8, 30)],
					placeholder: "Enter the password",
				},
				{
					name: "valid",
					testId: "password-valid",
					validations: [RequiredRule, MatchFieldRule("password")],
					placeholder: "Enter the validate password",
				},
			]}
			submitFunc={onSubmit}
		/>
	);
};

export default RegisterForm;
