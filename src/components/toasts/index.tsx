import React from "react";
import ToastService, { ToastCallback } from "services/toast";
import { ToastProps } from "./ToastTypes";
import ToastMessage from "./ToastMessage";
import styles from "./Toast.module.scss";
import CssLoader from "utils/cssloader";

const loader = new CssLoader(styles);

const toastService = ToastService.getInstance();

const Toast: React.FC<ToastProps> = () => {
	const [messages, setMessages] = React.useState(toastService.messages);

	const callback: ToastCallback = () => {
		setMessages([...toastService.messages]);
	};

	toastService.callback = callback;

	if (messages.length === 0) {
		return <div></div>;
	}
	return (
		<div data-testid="toast" className={loader.load("toast")}>
			{messages.map((message, index) => (
				<ToastMessage key={index} message={message} />
			))}
		</div>
	);
};

export default Toast;
