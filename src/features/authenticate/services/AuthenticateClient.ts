import Client from "services/request";
import { FormData } from "components/forms";
import { AuthenState, LoginModel } from "../data";
import AuthenticateLocalStorage from "../utils/AuthenticateLocalStorage";

class AuthenticateClient extends Client {
	async login(data: FormData) {
		const body: LoginModel = {
			username: data.username || "",
			password: data.password || "",
		};

		return await this.post<LoginModel>("users/login", body);
	}

	async getInfo() {
		const token = AuthenticateLocalStorage.getToken();

		if (!token) {
			return null;
		}

		const response = await this.get("users/user-info", token);

		if (!response.isSuccess()) {
			return null;
		}

		return response.getData<AuthenState>();
	}

	async register(data: FormData) {
		const body: LoginModel = {
			username: data.username || "",
			password: data.password || "",
		};

		return await this.post<LoginModel>("users/register", body);
	}
}

export default AuthenticateClient;
