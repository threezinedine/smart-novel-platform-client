import React from "react";
import { NavbarProps } from "./NavbarProps";
import Button from "components/buttons";
import useAuthenticateStore, {
	AuthenticateStore,
} from "features/authenticate/stores/type";
import ThemToggle from "features/theme";
import styles from "./Navbar.module.scss";
import CssLoader from "utils/cssloader";
import { useNavigate } from "react-router-dom";
import ToastService from "services/toast";

const loader = new CssLoader(styles);
const toast = ToastService.getInstance();

const Navbar: React.FC<NavbarProps> = () => {
	const authState: AuthenticateStore = useAuthenticateStore((state) => state);
	const navigate = useNavigate();

	const onLogout = () => {
		toast.addMessage({
			message: "Logout successfully",
			type: "success",
			duration: 1000,
		});
		authState.logout();
		navigate("/login");
	};

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

			<div className={loader.load("slider")} />

			<ThemToggle />

			<div>
				{!authState.authorized && (
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
				{authState.authorized && (
					<div className={loader.load("authen")}>
						<div className={loader.load("user")}>
							{authState.username}
						</div>
						<Button
							text="Logout"
							onClick={onLogout}
							testId="logout-btn"
							className={loader.load("nav-link")}
							secondary
						/>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
