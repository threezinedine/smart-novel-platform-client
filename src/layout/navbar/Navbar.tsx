import React from "react";
import { NavbarProps } from "./NavbarProps";
import Button from "components/buttons";
import useAuthenticateStore, {
	AuthenticateStore,
} from "features/authenticate/stores/type";
import ThemToggle from "features/theme";
import styles from "./styles.module.scss";
import CssLoader from "utils/cssloader";
import { useNavigate } from "react-router-dom";
import ToastService from "services/toast";
import { ReactComponent as Logo } from "assets/images/logo.svg";
import { NavlinkInfo } from "./types";
import Avatar from "features/avatar";
import { useAvatarStore } from "features/profile";
import Dropdown from "components/dropdown";
import { LanguageSelection, LangText } from "features/language";

const loader = new CssLoader(styles);
const toast = ToastService.getInstance();

const Navbar: React.FC<NavbarProps> = ({ registerPage }) => {
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
	};

	const links: NavlinkInfo[] = [
		{
			// name: "Home",
			name: <LangText text="home" />,
			path: "/",
			testId: "home",
		},
		{
			name: "Dashboard",
			path: "/dashboard",
			testId: "dashboard",
		},
		{
			name: "Todo",
			path: "/todo",
			testId: "todo",
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
			<LanguageSelection />

			<div>
				{!authState.authorized || registerPage ? (
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
				) : (
					<div className={loader.load("authen")}>
						<Dropdown
							gap={5}
							items={[
								{
									text: "Profile",
									to: "/profile",
									testId: "profile-btn",
								},
								{
									divider: true,
									text: "Logout",
									to: "/login",
									callback: onLogout,
									testId: "logout-btn",
								},
							]}
						>
							<div
								data-testid="user"
								className={loader.load("user")}
							>
								<Avatar
									className={loader.load("avatar")}
									avatar_url={avatar_url}
								/>
								<span data-testid="username">
									{authState.username}
								</span>
							</div>
						</Dropdown>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
