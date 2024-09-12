import React from "react";
import { CommonLayoutProps } from "./Props";
import Toast from "components/toasts";
import Navbar from "layout/navbar";
import styles from "./styles.module.scss";
import CssLoader from "utils/cssloader";
import { AuthenticateLayout } from "features/authenticate";

const loader = new CssLoader(styles);

const CommonLayout: React.FC<CommonLayoutProps> = ({
	page,
	registerForm,
	...authState
}) => {
	return (
		<div className={loader.load("container")}>
			<div className={loader.load("navbar")}>
				<Navbar registerPage={registerForm} />
			</div>
			<div className={loader.load("body")}>
				{!registerForm ? (
					<AuthenticateLayout {...authState}>
						{page}
					</AuthenticateLayout>
				) : (
					page
				)}
			</div>
			<Toast />
		</div>
	);
};

export default CommonLayout;
