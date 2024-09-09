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
import Avatar from "features/avatar";
import { useAvatarStore } from "features/profile";

const loader = new CssLoader(styles);
const toast = ToastService.getInstance();

const Navbar: React.FC<NavbarProps> = () => {
	const authState: AuthenticateStore = useAuthenticateStore((state) => state);
	const avatar_url = useAvatarStore((state) => state.avatar_url);
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
			testId: "home",
		},
		{
			name: "Dashboard",
			path: "/dashboard",
			testId: "dashboard",
		},
		{
			name: "About",
			path: "/about",
			testId: "about",
		},
	];

	return (
		<nav data-testid="navbar" className={loader.load("nav")}>
			<div data-testid="logo" onClick={() => navigate("/")}>
				<Logo className={loader.load("logo")} />
			</div>
			{links.map((link) => (
				<Button
					key={link.testId}
					to={link.path}
					text={link.name}
					testId={link.testId}
					className={loader.load("nav-link")}
				/>
			))}

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
							<Avatar
								className={loader.load("avatar")}
								avatar_url={avatar_url}
							/>
							<span>{authState.username}</span>
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
