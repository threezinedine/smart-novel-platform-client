import LocalStorage from "utils/localstorage";
import { TokenResponse } from "../data";

class AuthenticateLocalStorage {
	static bindToken(token: TokenResponse): void {
		LocalStorage.setItem("token", token.access_token);
	}

	static getToken(): string {
		return LocalStorage.loadItem("token", "");
	}

	static clearToken(): void {
		LocalStorage.deleteItem("token");
	}

	static hasToken(): boolean {
		return LocalStorage.contains("token");
	}

	static resetToken(): void {
		LocalStorage.deleteItem("token");
	}
}

export default AuthenticateLocalStorage;
