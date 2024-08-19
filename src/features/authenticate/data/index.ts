interface LoginModel {
	username: string;
	password: string;
}

interface TokenResponse {
	access_token: string;
	type: string;
}

interface AuthenState {
	username: string;
}

export type { LoginModel, TokenResponse, AuthenState };
