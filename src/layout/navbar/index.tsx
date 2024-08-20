import React from "react";
import { NavbarProps } from "./NavbarProps";
import Button from "components/buttons";
import useAuthenticateStore from "features/authenticate/stores/type";

const Navbar: React.FC<NavbarProps> = () => {
	const isAuthenticated = useAuthenticateStore((state) => state.authorized);

	return (
		<nav data-testid="navbar">
			<Button to="/" text="Logo" testId="logo" />
			<Button to="/" text="Home" testId="home" />

			<div>
				{!isAuthenticated && (
					<>
						<Button to="/login" text="Button" testId="login-btn" />
						<Button
							to="/register"
							text="Button"
							testId="register-btn"
						/>
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
