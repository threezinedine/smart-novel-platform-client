import React from "react";
import { AvatarProps } from "./Props";
import styles from "./Avatar.module.scss";
import CssLoader from "utils/cssloader";
import { useAuthenticateStore } from "features/authenticate";

const loader = new CssLoader(styles);

const Avatar: React.FC<AvatarProps> = ({ size, className, avatar_url }) => {
	const authState = useAuthenticateStore((state) => state);

	size = size || 50;

	return (
		<div
			style={{ "--avatar-size": `${size}px` } as React.CSSProperties}
			className={loader.load("avatar-container", className)}
		>
			{avatar_url === "" ||
			avatar_url === null ||
			avatar_url === undefined ? (
				<div className={loader.load("avatar-default")}>
					{authState.username && authState.username[0]}
				</div>
			) : (
				<img
					className={loader.load("avatar")}
					src={`data:image/png;base64,${avatar_url}`}
					alt="avatar"
				/>
			)}
		</div>
	);
};

export default Avatar;
