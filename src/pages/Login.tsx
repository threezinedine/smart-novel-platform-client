import React, { useEffect } from "react";
import { LoginForm } from "features/authenticate";

const Login: React.FC = () => {
	useEffect(() => {
		document.title = "Login";
	});

	return (
		<div>
			<LoginForm />
		</div>
	);
};

export default Login;
