/// <reference types="cypress" />
import { BASE_URL } from "../constants";

const visit = (url?: string) => {
	cy.visit(`${BASE_URL}/${url}`);
};

describe("Testing of the Login Page", () => {
	it("should have the title of Login", () => {
		visit("login");

		cy.title().should("eq", "Login");
	});

	it("should has input for username and password", () => {
		visit("login");
		cy.get("[data-testid=username]").should("exist");

		const password = cy.get("[data-testid=password]");
		password.should("exist");

		password.should("have.attr", "type", "password");
	});

	it("it should show error when click submit at the first time and show username and password is required", () => {
		visit("login");
		const submit = cy.get("[data-testid=submit]");
		const username = cy.get("[data-testid=username]");
		const password = cy.get("[data-testid=password]");

		submit.click();

		cy.get("[data-testid=error]")
			.should("have.length", 2)
			.and("contain.text", "This field is required");
		username.type("admin").blur();
		cy.get("[data-testid=error]").should("have.length", 1);
		password.type("admin").blur();
		cy.get("[data-testid=error]").should("not.exist");
		password.clear().blur();
		cy.get("[data-testid=error]").should("have.length", 1);
		password.type("admin").blur();
	});

	it("should call the request when click submit and move to the dashboard page with default username", () => {
		visit("login");

		cy.get("[data-testid=username]").type("admin");
		cy.get("[data-testid=password]").type("admin");

		cy.get("[data-testid=submit]").click();

		cy.url().should("eq", "http://localhost:3000/dashboard");
	});

	it("should display the error when the username and password is invalid", () => {
		visit("login");

		cy.get("[data-testid=username]").type("admin-fake");
		cy.get("[data-testid=password]").type("admin-fake");

		cy.get("[data-testid=submit]").click();

		cy.url().should("eq", "http://localhost:3000/login");
		cy.get("[data-testid=toast-error]").should("exist");
	});
});
