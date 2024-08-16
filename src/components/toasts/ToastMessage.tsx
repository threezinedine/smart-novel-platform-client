import React from "react";
import { ToastMessageProps } from "./ToastTypes";

const ToastMessage: React.FC<ToastMessageProps> = ({ message }) => {
	return <div data-testid={`toast-${message.type}`}>{message.message}</div>;
};

export default ToastMessage;
