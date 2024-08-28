/// <reference types="cypress" />
import { visit, randomString } from "../utils";

describe("Registering test", () => {
	it("should has the input value must be in range 8 - 30 character", () => {
		visit("register");

		cy.get("[data-testid=username]").type(randomString(7)).blur();
		cy.get("[data-testid=error").should("exist");

		cy.get("[data-testid=username]").clear().type(randomString(8)).blur();
		cy.get("[data-testid=error").should("not.exist");

		cy.get("[data-testid=username]").clear().type(randomString(31)).blur();
		cy.get("[data-testid=error").should("exist");

		cy.get("[data-testid=username]").clear().type(randomString(30)).blur();
		cy.get("[data-testid=error").should("not.exist");
	});

	it("should has the password field must be in range 8 - 30 character", () => {
		visit("register");

		cy.get("[data-testid=password]").type(randomString(7)).blur();
		cy.get("[data-testid=error").should("exist");

		cy.get("[data-testid=password]").clear().type(randomString(8)).blur();
		cy.get("[data-testid=error").should("not.exist");

		cy.get("[data-testid=password]").clear().type(randomString(31)).blur();
		cy.get("[data-testid=error").should("exist");

		cy.get("[data-testid=password]").clear().type(randomString(30)).blur();
		cy.get("[data-testid=error").should("not.exist");
	});

	it("should has the password valid field must has the same value with password field", () => {
		visit("register");

		const validPassword = randomString(13);

		cy.get("[data-testid=password]").type(validPassword).blur();
		cy.get("[data-testid=password-valid]").type(randomString(8)).blur();
		cy.get("[data-testid=error").should("exist");

		cy.get("[data-testid=password-valid]")
			.clear()
			.type(validPassword)
			.blur();
		cy.get("[data-testid=error").should("not.exist");
	});
});
