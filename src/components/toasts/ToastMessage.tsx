import React from "react";
import { ToastMessageProps } from "./ToastTypes";
import styles from "./Toast.module.scss";
import CssLoader from "utils/cssloader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCheck,
	faXmark,
	faInfo,
	faWarning,
} from "@fortawesome/free-solid-svg-icons";
import ToastService from "services/toast";

const loader = new CssLoader(styles);
const toast = ToastService.getInstance();

const ToastMessage: React.FC<ToastMessageProps> = ({ message }) => {
	const icon = {
		className: loader.load("toast-icon"),
		icon: faCheck,
	};
	let color = "#5DC122";

	switch (message.type) {
		case "error":
			icon.icon = faXmark;
			color = "#FF5C77";
			break;
		case "info":
			icon.icon = faInfo;
			color = "#4DB1FF";
			break;
		case "warning":
			icon.icon = faWarning;
			color = "#FFB300";
			break;
		default:
			break;
	}

	return (
		<div
			data-testid={`toast-${message.type}`}
			className={loader.load("toast-message")}
			style={{ backgroundColor: color }}
		>
			<FontAwesomeIcon {...icon} className={loader.load("icon")} />
			<div className={loader.load("message")}>{message.message}</div>
			<FontAwesomeIcon
				icon={faXmark}
				className={loader.load("toast-close")}
				onClick={() => {
					toast.removeMessage(message);
				}}
			/>
		</div>
	);
};

export default ToastMessage;
