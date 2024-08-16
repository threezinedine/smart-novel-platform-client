import Client from "services/request";
import { Data } from "components/forms";
import { LoginModel } from "../data";

class LoginClient extends Client {
	async login(data: Data) {
		const body: LoginModel = {
			username: data.username,
			password: data.password,
		};

		return await this.post<LoginModel>("users/login", body);
	}
}

export default LoginClient;
