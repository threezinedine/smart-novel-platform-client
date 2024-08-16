import { JSONDict } from "data/styles";
import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
	baseURL: "http://localhost:8291",
});

class Response {
	private m_StatusCode: number;
	private m_Data: JSONDict;

	constructor(statusCode: number, data: JSONDict) {
		this.m_StatusCode = statusCode;
		this.m_Data = data;
	}

	get statusCode() {
		return this.m_StatusCode;
	}

	set statusCode(statusCode: number) {
		this.m_StatusCode = statusCode;
	}

	get data() {
		return this.m_Data;
	}

	isSuccess() {
		return this.m_StatusCode >= 200 && this.m_StatusCode < 300;
	}
}

class Client {
	private m_Axios: AxiosInstance = instance;

	async get(url: string) {
		try {
			const response = await this.m_Axios.get(url);
			return new Response(response.status, response.data);
		} catch (error: any) {
			return new Response(error.response.status, {});
		}
	}

	async post<T>(url: string, body: T) {
		try {
			const response = await this.m_Axios.post(url, body);
			return new Response(response.status, response.data);
		} catch (error: any) {
			return new Response(error.response.request.status, {});
		}
	}
}

export { Response };
export default Client;
