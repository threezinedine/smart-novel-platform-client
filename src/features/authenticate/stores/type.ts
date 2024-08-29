import { create } from "zustand";
import AuthenticateLocalStorage from "../utils/AuthenticateLocalStorage";

interface AuthenticateState {
	authorized: boolean;
	username?: string;
	role?: string;
}

interface AuthenticateActions {
	login: (username: string, role: string) => void;
	logout: () => void;
}

interface AuthenticateStore extends AuthenticateState, AuthenticateActions {}

const useAuthenticateStore = create<AuthenticateStore>((set) => ({
	authorized: false,
	login: (username, role) =>
		set((state) => {
			return { username, role, authorized: true };
		}),
	logout: () =>
		set((state) => {
			AuthenticateLocalStorage.clearToken();
			return {
				username: undefined,
				role: undefined,
				authorized: false,
			};
		}),
}));

export default useAuthenticateStore;
export type { AuthenticateStore };
