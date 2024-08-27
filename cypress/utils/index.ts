/// <reference types="cypress" />
import { BASE_URL } from "../constants";

export const visit = (path: string | null = null) => {
	if (path === null) {
		cy.visit(BASE_URL);
	} else {
		cy.visit(`${BASE_URL}${path}`);
	}
};
