type ToastType = "error" | "success" | "info" | "warning";

interface ToastMessage {
	type: ToastType;
	message: string;
	duration?: number;
}

type ToastCallback = () => void;

export type { ToastMessage, ToastType, ToastCallback };
