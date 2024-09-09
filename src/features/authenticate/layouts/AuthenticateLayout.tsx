import React, { useEffect } from "react";
import { AuthenticateLayoutProps } from "./AuthenticateLayoutProps";
import LoginClient from "../services/AuthenticateClient";
import { AuthenState } from "../data";
import ToastService from "services/toast";
import useAuthenticateStore from "../stores/type";

const AuthenticateLayout: React.FC<AuthenticateLayoutProps> = ({
	children,
	roles,
}) => {
	const authenticateStore = useAuthenticateStore();

	const client = new LoginClient();
	const toast = ToastService.getInstance();
	let isAuthorized = false;

	// if (!authenticateStore.authorized) {
	useEffect(() => {
		client.getInfo().then((response: AuthenState | null) => {
			if (response) {
				!authenticateStore.authorized &&
					authenticateStore.login(response.username, response.role);
			} else {
				toast.addMessage({
					message: "Not authorized",
					type: "error",
					duration: 1000,
				});
				authenticateStore.authorized && authenticateStore.logout();
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (authenticateStore.authorized && roles) {
		isAuthorized = roles.includes(authenticateStore.role || "");
	} else {
		isAuthorized = true;
	}
	// }

	return (
		<div>
			{authenticateStore.authorized && isAuthorized ? (
				<div data-testid="authorized">{children}</div>
			): <div data-testid="unauthorized">Not authorized</div>}
		</div>
	);
};

export default AuthenticateLayout;
