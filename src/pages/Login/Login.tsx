import React, { useEffect } from "react";
import { LoginForm } from "features/authenticate";
import styles from "./Login.module.scss";
import CssLoader from "utils/cssloader";

const loader = new CssLoader(styles);

const Login: React.FC = () => {
	useEffect(() => {
		document.title = "Login";
	});

	return (
		<div className={loader.load("container")}>
			<LoginForm />
		</div>
	);
};

export default Login;
