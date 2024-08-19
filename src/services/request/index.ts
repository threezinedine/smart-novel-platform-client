import { JSONDict } from "data/styles";
import axios, { AxiosError, AxiosInstance } from "axios";
import { ResponseErrorContent } from "./types";

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

	getData<T>() {
		return this.m_Data as T;
	}
}

class Client {
	private m_Axios: AxiosInstance = instance;

	async get(url: string, token?: string) {
		let headers: JSONDict = {};

		if (token) {
			headers["Authorization"] = `Bearer ${token}`;
		}

		try {
			const response = await this.m_Axios.get(url, { headers });
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
			return new Response(error.response.status, error.response.data);
		}
	}
}

export type { ResponseErrorContent };
export { Response };
export default Client;
