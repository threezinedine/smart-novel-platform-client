import { JSONDict } from "data/styles";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { ResponseErrorContent } from "./types";
import { AuthenticateLocalStorage } from "features/authenticate";

const host = process.env.REACT_APP_SERVER_URL;

const instance: AxiosInstance = axios.create({
	baseURL: `${host}/api`,
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

	getData<T>() {
		return this.m_Data as T;
	}
}

class Client {
	private m_Axios: AxiosInstance = instance;

	async get(url: string, auth?: boolean) {
		let config: AxiosRequestConfig = {};

		if (auth) {
			const token = AuthenticateLocalStorage.getToken();
			config.headers = {};
			config.headers.Authorization = `Bearer ${token}`;
		}

		try {
			const response = await this.m_Axios.get(url, config);
			return new Response(response.status, response.data);
		} catch (error: any) {
			if (error instanceof AxiosError) {
				return new Response(Number(error.code), error.response?.data);
			} else {
				return new Response(500, { error: "Internal Server Error" });
			}
		}
	}

	async post<T>(url: string, body: T) {
		try {
			const response = await this.m_Axios.post(url, body);
			return new Response(response.status, response.data);
		} catch (error: any) {
			if (error instanceof AxiosError) {
				return new Response(Number(error.code), error.response?.data);
			}
			return new Response(600, error);
		}
	}

	async put<T>(url: string, body: T, auth?: boolean) {
		let config: AxiosRequestConfig = {};

		if (auth) {
			const token = AuthenticateLocalStorage.getToken();
			config.headers = {};
			config.headers.Authorization = `Bearer ${token}`;
		}

		try {
			const response = await this.m_Axios.put(url, body, config);
			return new Response(response.status, response.data);
		} catch (error: any) {
			if (error instanceof AxiosError) {
				return new Response(Number(error.code), error.response?.data);
			}
			return new Response(600, error);
		}
	}
}

export type { ResponseErrorContent };
export { Response };
export default Client;
