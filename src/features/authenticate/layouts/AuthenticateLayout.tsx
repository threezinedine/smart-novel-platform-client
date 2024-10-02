import React, { useEffect } from "react";
import { AuthenticateLayoutProps } from "./AuthenticateLayoutProps";
import LoginClient from "../services/AuthenticateClient";
import { AuthenState } from "../data";
import ToastService from "services/toast";
import useAuthenticateStore from "../stores/type";
import { useAvatarStore } from "features/profile";
import ProfileClient from "features/profile/services/ProfileClient";
import { ProfileSchema } from "features/profile/data/types";

const AuthenticateLayout: React.FC<AuthenticateLayoutProps> = ({
	children,
	roles,
	auth,
}) => {
	const authenticateStore = useAuthenticateStore();
	const setAvatar = useAvatarStore((state) => state.setAvatar);
	const client = new LoginClient();
	const toast = ToastService.getInstance();
	let isAuthorized = false;

	useEffect(() => {
		client.getInfo().then((response: AuthenState | null) => {
			if (response) {
				!authenticateStore.authorized &&
					authenticateStore.login(response.username, response.role);

				new ProfileClient().getProfile().then((response) => {
					if (response) {
						const profile = response.getData<ProfileSchema>();
						setAvatar(profile.avatar_url);
					}
				});
			} else {
				toast.addMessage({
					message: "Not authorized",
					type: "error",
					duration: 1000,
				});
				authenticateStore.authorized && authenticateStore.logout();
			}
		});
	});

	if (authenticateStore.authorized && roles) {
		isAuthorized = roles.includes(authenticateStore.role || "");
	} else {
		isAuthorized = true;
	}

	return (
		<div>
			{auth ? (
				authenticateStore.authorized && isAuthorized ? (
					<div data-testid="authorized">{children}</div>
				) : (
					<div data-testid="unauthorized">Not authorized</div>
				)
			) : (
				children
			)}
		</div>
	);
};

export default AuthenticateLayout;
