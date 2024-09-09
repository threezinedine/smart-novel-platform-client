/// reference types="cypress" />
import { visit, randomString, randomNumber } from "../utils";

describe("Profile testing", () => {
	const setup = () => {
		localStorage.removeItem("token");
		visit("login");

		cy.get("[data-testid=username]").type("threezinedine");
		cy.get("[data-testid=password]").type("threezinedine");
		cy.get("[data-testid=submit").click();

		cy.url().should("include", "/dashboard");
	};

	it("should have some validators for the inputs", () => {
		const testEmail = `test${randomString(5)}@gmail.com`;
		const testFirstName = randomString(10);
		const testSecondName = randomString(10);
		const testAddress = randomString(30);
		const testPhone = randomNumber(10);
		setup();

		visit("profile");

		cy.get("[data-testid=profile-com").should("exist");

		cy.get("[data-testid=username")
			.should("exist")
			.should("have.attr", "readonly");
		cy.get("[data-testid=email]")
			.should("exist")
			.should("have.attr", "type", "email")
			.should("not.have.attr", "readonly");
		cy.get("[data-testid=email]").clear().type("test").blur();
		cy.get("[data-testid=error]").should("exist");
		cy.get("[data-testid=email]").clear().type(testEmail).blur();
		cy.get("[data-testid=error]").should("not.exist");

		cy.get("[data-testid=first-name")
			.should("exist")
			.should("not.have.attr", "readonly");
		cy.get("[data-testid=first-name]")
			.clear()
			.type(randomString(31))
			.blur();
		cy.get("[data-testid=error]").should("exist");
		cy.get("[data-testid=first-name]").clear().type(testFirstName).blur();
		cy.get("[data-testid=error]").should("not.exist");

		cy.get("[data-testid=last-name")
			.should("exist")
			.should("not.have.attr", "readonly");
		cy.get("[data-testid=last-name]").clear().type(randomString(31)).blur();
		cy.get("[data-testid=error]").should("exist");
		cy.get("[data-testid=last-name]").clear().type(testSecondName).blur();
		cy.get("[data-testid=error]").should("not.exist");

		cy.get("[data-testid=address")
			.should("exist")
			.should("not.have.attr", "readonly");
		cy.get("[data-testid=address").clear().type(randomString(41)).blur();
		cy.get("[data-testid=error]").should("exist");
		cy.get("[data-testid=address]").clear().type(testAddress).blur();
		cy.get("[data-testid=error]").should("not.exist");

		cy.get("[data-testid=phone")
			.should("exist")
			.should("not.have.attr", "readonly");
		cy.get("[data-testid=phone").clear().type("aslfkj3239j").blur();
		cy.get("[data-testid=error]").should("exist");
		cy.get("[data-testid=phone")
			.clear()
			.type(`${randomNumber(11)}`)
			.blur();
		cy.get("[data-testid=error]").should("exist");
		cy.get("[data-testid=phone]").clear().type(testPhone).blur();
		cy.get("[data-testid=error]").should("not.exist");

		cy.get("[data-testid=submit").click();
		cy.get("[data-testid=toast-success]").should("exist");

		visit("profile");

		cy.get("[data-testid=email]").should("have.value", testEmail);
		cy.get("[data-testid=first-name]").should("have.value", testFirstName);
		cy.get("[data-testid=last-name]").should("have.value", testSecondName);
		cy.get("[data-testid=address]").should("have.value", testAddress);
		cy.get("[data-testid=phone]").should("have.value", testPhone);
	});
});
