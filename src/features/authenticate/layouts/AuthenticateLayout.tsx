import React, { useEffect, useState } from "react";
import { AuthenticateLayoutProps } from "./AuthenticateLayoutProps";
import AuthenticateLocalStorage from "../utils/AuthenticateLocalStorage";
import LoginClient from "../services/LoginClient";
import { AuthenState } from "../data";

const AuthenticateLayout: React.FC<AuthenticateLayoutProps> = ({
	children,
}) => {
	const [isAuthorized, setIsAuthorized] = useState(
		AuthenticateLocalStorage.hasToken()
	);

	const client = new LoginClient();

	client.getInfo().then((response: AuthenState | null) => {
		console.log(response);

		if (response) {
			setIsAuthorized(true);
		} else {
			setIsAuthorized(false);
		}
	});

	return (
		<div>
			{!isAuthorized && (
				<div data-testid="unauthorized">Not authorized</div>
			)}
			{isAuthorized && <div data-testid="authorized">{children}</div>}
		</div>
	);
};

export default AuthenticateLayout;
