import Client from "services/request";
import { Data } from "components/forms";
import { AuthenState, LoginModel } from "../data";
import AuthenticateLocalStorage from "../utils/AuthenticateLocalStorage";

class LoginClient extends Client {
	async login(data: Data) {
		const body: LoginModel = {
			username: data.username,
			password: data.password,
		};

		return await this.post<LoginModel>("users/login", body);
	}

	async getInfo() {
		const token = AuthenticateLocalStorage.getToken();

		if (!token) {
			return null;
		}

		const response = await this.get("users/info", token);

		if (!response.isSuccess()) {
			return null;
		}
		return response.getData<AuthenState>();
	}
}

export default LoginClient;
