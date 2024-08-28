import RegisterForm from "features/authenticate/components/RegisterForm";
import React from "react";
import styles from "./Register.module.scss";
import CssLoader from "utils/cssloader";

const loader = new CssLoader(styles);

const Register: React.FC = () => {
	return (
		<div className={loader.load("container")}>
			<RegisterForm />
		</div>
	);
};

export default Register;
