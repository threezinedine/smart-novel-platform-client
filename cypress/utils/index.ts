/// <reference types="cypress" />
import { BASE_URL } from "../constants";

export const visit = (path: string | null = null) => {
	if (path === null) {
		cy.visit(BASE_URL);
	} else {
		cy.visit(`${BASE_URL}${path}`);
	}
};

export const randomString = (length: number): string => {
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	for (let i = 0; i < length; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * characters.length)
		);
	}

	return result;
};

export const randomNumber = (length: number): string => {
	const characters = "0123456789";
	let result = "";
	for (let i = 0; i < length; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * characters.length)
		);
	}
	return result;
};
