import React from "react";
import ToastService, { ToastCallback } from "services/toast";
import { ToastProps } from "./ToastTypes";
import ToastMessage from "./ToastMessage";

const toastService = ToastService.getInstance();

const Toast: React.FC<ToastProps> = () => {
	const [messages, setMessages] = React.useState(toastService.messages);

	const callback: ToastCallback = () => {
		setMessages([...toastService.messages]);
	};

	toastService.callback = callback;

	return (
		<div data-testid="toast">
			{messages.map((message, index) => (
				<ToastMessage key={index} message={message} />
			))}
		</div>
	);
};

export default Toast;
