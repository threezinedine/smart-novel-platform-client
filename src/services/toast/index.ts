import { ToastMessage, ToastCallback } from "./types";

class ToastService {
	private static instance: ToastService;

	private m_Messages = new Array<ToastMessage>();
	private m_Callback: ToastCallback | null = null;

	public static getInstance(): ToastService {
		return this.instance || (this.instance = new this());
	}

	set callback(callback: ToastCallback) {
		this.m_Callback = callback;
	}

	get messages(): ToastMessage[] {
		return this.m_Messages;
	}

	addMessage(message: ToastMessage): void {
		this.m_Messages.push(message);
		this.m_Callback && this.m_Callback();

		if (message.duration) {
			setTimeout(() => {
				this.removeMessage(message);
			}, message.duration);
		}
	}

	removeMessage(message: ToastMessage): void {
		const index = this.m_Messages.indexOf(message);
		this.m_Messages.splice(index, 1);
	}
}

export default ToastService;
export type { ToastMessage, ToastCallback };
