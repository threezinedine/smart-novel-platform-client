import React from "react";
import { NavbarProps } from "./NavbarProps";
import Button from "components/buttons";
import useAuthenticateStore from "features/authenticate/stores/type";
import ThemToggle from "features/theme";
import styles from "./Navbar.module.scss";
import CssLoader from "utils/cssloader";

const loader = new CssLoader(styles);

const Navbar: React.FC<NavbarProps> = () => {
	const isAuthenticated = useAuthenticateStore((state) => state.authorized);

	return (
		<nav data-testid="navbar" className={loader.load("nav")}>
			<Button
				to="/"
				text="Logo"
				testId="logo"
				className={loader.load("nav-link")}
			/>
			<Button
				to="/"
				text="Home"
				testId="home"
				className={loader.load("nav-link")}
			/>
			<ThemToggle />

			<div>
				{!isAuthenticated && (
					<>
						<Button
							to="/login"
							text="Login"
							testId="login-btn"
							className={loader.load("nav-link")}
						/>
						<Button
							to="/register"
							text="Register"
							testId="register-btn"
							className={loader.load("nav-link")}
							secondary
						/>
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
