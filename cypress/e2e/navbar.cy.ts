/// <reference types="cypress" />
import { visit } from "../utils";

describe("Navbar", () => {
	it("renders", () => {
		localStorage.removeItem("token");
		visit();

		cy.get("[data-testid=navbar]").should("exist");
		cy.get("[data-testid=logo").should("exist");
		cy.get("[data-testid=home").should("exist");

		cy.get("[data-testid=login-btn").should("exist");
		cy.get("[data-testid=register-btn").should("exist");
	});

	it("should navigate when click the buttons", () => {
		localStorage.removeItem("token");
		visit();

		cy.get("[data-testid=login-btn").click();
		cy.url().should("include", "/login");

		cy.get("[data-testid=logo").click();
		cy.url().should("eq", "http://localhost:3000/");

		cy.get("[data-testid=register-btn").click();
		cy.url().should("include", "/register");

		cy.get("[data-testid=home").click();
		cy.url().should("eq", "http://localhost:3000/");
	});

	it("should contain no login and register buttons when logged in", () => {
		visit("login");

		cy.get("[data-testid=username]").type("admin");
		cy.get("[data-testid=password]").type("admin");

		cy.get("[data-testid=submit").click();
		cy.wait(100);
		cy.get("[data-testid=login-btn]").should("not.exist");

		cy.get("[data-testid=user").click();
		cy.url().should("include", "/profile");
	});

	it("should have the light mode theme at the start and save the configuration", () => {
		visit();
		localStorage.removeItem("theme");

		cy.get("body").should("have.attr", "data-theme", "light");
		cy.get("[data-testid=theme-toggle]").click();

		cy.get("body").should("have.attr", "data-theme", "dark");

		visit();
		cy.get("body").should("have.attr", "data-theme", "dark");
	});
});
