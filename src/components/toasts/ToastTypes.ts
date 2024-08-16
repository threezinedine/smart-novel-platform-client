import { ToastMessage } from "services/toast";

interface ToastProps {}
interface ToastMessageProps {
	message: ToastMessage;
}

export type { ToastProps, ToastMessageProps };
