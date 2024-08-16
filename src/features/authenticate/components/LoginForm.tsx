import React from "react";
import Form from "components/forms";
import RequiredRule from "./RequireRule";
import { useNavigate } from "react-router-dom";
import LoginClient from "../services/LoginClient";
import { Response, ResponseErrorContent } from "services/request";
import ToastService from "services/toast";

const toastService = ToastService.getInstance();

const LoginForm: React.FC = () => {
	const client = new LoginClient();
	const navigator = useNavigate();
	const onSubmit = async (data: any) => {
		const response: Response = await client.login(data);

		if (response.isSuccess()) {
			toastService.addMessage({
				type: "success",
				message: "Login successfully",
			});
			navigator("/dashboard");
		} else {
			toastService.addMessage({
				type: "error",
				message: response.getData<ResponseErrorContent>().message,
			});
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
