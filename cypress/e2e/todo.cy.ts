/// reference types="cypress" />

import { visit, login } from "../utils";

describe("Todo app", () => {
	it("should be able to see the todos", () => {
		localStorage.clear();

		visit("todo");
		cy.get("[data-testid=unauthorized]").should("exist");

		login("threezinedine", "threezinedine");

		visit("todo");
		cy.get("[data-testid=todo-container]").should("exist");
	});
});
