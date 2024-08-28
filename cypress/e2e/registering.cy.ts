/// <reference types="cypress" />
import { visit, randomString } from "../utils";

describe("Registering test", () => {
	it("the form should be valid with the range 8 - 30 chars and must match field", () => {
		visit("register");

		cy.get("[data-testid=username]").type(randomString(7)).blur();
		cy.get("[data-testid=error").should("exist");

		cy.get("[data-testid=username]").clear().type(randomString(8)).blur();
		cy.get("[data-testid=error").should("not.exist");

		cy.get("[data-testid=username]").clear().type(randomString(31)).blur();
		cy.get("[data-testid=error").should("exist");

		cy.get("[data-testid=username]").clear().type(randomString(30)).blur();
		cy.get("[data-testid=error").should("not.exist");

		cy.get("[data-testid=password]").type(randomString(7)).blur();
		cy.get("[data-testid=error").should("exist");

		cy.get("[data-testid=password]").clear().type(randomString(8)).blur();
		cy.get("[data-testid=error").should("not.exist");

		cy.get("[data-testid=password]").clear().type(randomString(31)).blur();
		cy.get("[data-testid=error").should("exist");

		cy.get("[data-testid=password]").clear().type(randomString(30)).blur();
		cy.get("[data-testid=error").should("not.exist");

		const validPassword = randomString(13);

		cy.get("[data-testid=password]").clear().type(validPassword).blur();
		cy.get("[data-testid=password-valid]")
			.clear()
			.type(randomString(8))
			.blur();
		cy.get("[data-testid=error").should("exist");

		cy.get("[data-testid=password-valid]")
			.clear()
			.type(validPassword)
			.blur();
		cy.get("[data-testid=error").should("not.exist");
	});

	it("should show error if submit when nothing is enterred", () => {
		visit("register");

		cy.get("[data-testid=submit]").click();

		cy.get("[data-testid=error]").should("exist");
	});

	it("when register successfully, then receive the success toast", () => {
		visit("register");

		const randomUsername = randomString(12);
		const randomPassword = randomString(12);

		cy.get("[data-testid=username]").type(randomUsername);
		cy.get("[data-testid=password]").type(randomPassword);
		cy.get("[data-testid=password-valid]").type(randomPassword);

		cy.get("[data-testid=submit]").click();

		cy.get("[data-testid=toast-success]").should("exist");
		cy.url().should("include", "/login");

		visit("register");

		cy.get("[data-testid=username]").type(randomUsername);
		cy.get("[data-testid=password]").type(randomPassword);
		cy.get("[data-testid=password-valid]").type(randomPassword);

		cy.get("[data-testid=submit]").click();

		cy.get("[data-testid=toast-error]").should("exist");
	});
});
