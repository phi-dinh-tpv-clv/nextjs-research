describe("Forms test", () => {
  beforeEach(() => {
    cy.visit("/forms");
  });

  it("Test subscribe form", () => {
    cy.contains(/testing forms/i);
    cy.getDataTest("subscribe-form").find("input").as("subscribe-input");

    cy.get("@subscribe-input").type("ryan-test@gmail.com");
    cy.contains(/Successfully subbed: ryan-test@gmail.com/i).should(
      "not.exist"
    );
    cy.getDataTest("subscribe-button").click();
    cy.contains(/Successfully subbed: ryan-test@gmail.com/i).should("exist");
    cy.wait(3000);

    cy.contains(/Successfully subbed: ryan-test@gmail.com/i).should(
      "not.exist"
    );
    cy.get("@subscribe-input").type("test@coderyan.io");
    cy.contains(/invalid email: test@coderyan.io!/i).should("not.exist");
    cy.getDataTest("subscribe-button").click();
    cy.contains(/invalid email: test@coderyan.io!/i).should("exist");
    cy.wait(3000);
    cy.contains(/invalid email: test@coderyan.io!/i).should("not.exist");

    cy.contains(/fail!/i).should("exist");
    cy.getDataTest("subscribe-button").click();
    cy.contains(/fail!/i).should("exist");
  });
});
