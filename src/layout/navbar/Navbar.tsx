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
import { ReactComponent as Logo } from "assets/images/logo.svg";
import { NavlinkInfo } from "./types";

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

	const links: NavlinkInfo[] = [
		{
			name: "Home",
			path: "/",
		},
		{
			name: "Dashboard",
			path: "/dashboard",
		},
		{
			name: "About",
			path: "/about",
		},
	];

	return (
		<nav data-testid="navbar" className={loader.load("nav")}>
			<div data-testid="logo" onClick={() => navigate("/")}>
				<Logo className={loader.load("logo")} />
			</div>
			{links.map((link) => (
				<Button
					to={link.path}
					text={link.name}
					testId={link.name}
					className={loader.load("nav-link")}
				/>
			))}
			{/* <Button
				to="/"
				text="Home"
				testId="home"
				className={loader.load("nav-link")}
			/> */}

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
						<div
							data-testid="user"
							onClick={() => navigate("/profile")}
							className={loader.load("user")}
						>
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
