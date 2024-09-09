/// <reference types="cypress" />
import { BASE_URL } from "../constants";
import { visit } from "../utils";

describe("Testing of the Login Page", () => {
	it("it should show error when click submit at the first time and show username and password is required", () => {
		visit("login");
		const submit = cy.get("[data-testid=submit]");
		const username = cy.get("[data-testid=username]");
		const password = cy.get("[data-testid=password]");

		password.should("have.attr", "type", "password");

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

		cy.url().should("eq", `${BASE_URL}dashboard`);
		cy.get("[data-testid=toast-success]").should("exist");
		cy.get("[data-testid=unauthorized]").should("not.exist");
		cy.get("[data-testid=authorized]").should("exist");

		cy.get("[data-testid=logout-btn]").click();
		cy.url().should("include", "login");
		cy.get("[data-testid=toast-success]").should("exist");

		visit("dashboard");
		cy.wait(100);
		cy.get("[data-testid=unauthorized]").should("exist");
		cy.get("[data-testid=authorized]").should("not.exist");
	});

	it("should display the error when the username and password is invalid", () => {
		visit("login");

		cy.get("[data-testid=username]").type("admin-fake");
		cy.get("[data-testid=password]").type("admin-fake");

		cy.get("[data-testid=submit]").click();

		cy.url().should("eq", `${BASE_URL}login`);
		cy.get("[data-testid=toast-error]").should("exist");
	});

	it("should display unauthorized when the token is empty", () => {
		visit("dashboard");
		localStorage.removeItem("token");

		cy.get("[data-testid=unauthorized]").should("exist");
	});

	it("should display unauthorized when the token is expired", () => {
		cy.visit(`${BASE_URL}dashboard`, {
			onBeforeLoad(win) {
				win.localStorage.setItem(
					"token",
					`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
						.eyJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNzI0MDQyNzA0fQ
						.-VlpsHnzQe96am0177QXMyclD7H4Dopn50CJvLhhw7g`
				);
			},
		});
		cy.wait(100);
		cy.get("[data-testid=unauthorized]").should("exist");

		// toast error should be displayed once
		cy.get("[data-testid=toast-error]").should("have.length", 1);

		visit("login");

		cy.get("[data-testid=username]").type("admin");
		cy.get("[data-testid=password]").type("admin");
		cy.get("[data-testid=submit]").click();

		cy.url().should("eq", `${BASE_URL}dashboard`);
		cy.wait(100);
		cy.get("[data-testid=unauthorized]").should("not.exist");
		cy.get("[data-testid=authorized]").should("exist");
	});

	it("should can access the admin page when the role is admin", () => {
		visit("login");

		cy.get("[data-testid=username]").type("admin");
		cy.get("[data-testid=password]").type("admin");
		cy.get("[data-testid=submit]").click();

		cy.url().should("include", "dashboard");

		visit("admin");
		cy.wait(100);
		cy.get("[data-testid=authorized]").should("exist");
		cy.get("[data-testid=unauthorized]").should("not.exist");
	});

	it("should not access the admin page when the role is user", () => {
		visit("login");

		cy.get("[data-testid=username]").type("threezinedine");
		cy.get("[data-testid=password]").type("threezinedine");
		cy.get("[data-testid=submit]").click();

		cy.url().should("include", "dashboard");
		visit("admin");
		cy.wait(100);
		cy.get("[data-testid=unauthorized]").should("exist");
		cy.get("[data-testid=authorized]").should("not.exist");
	});
});
