describe("template spec", () => {
  beforeEach(() => {
    cy.visit("/auth/login");
  });

  it("should render", () => {
    cy.getDataCy("login-page").should("contain.text", "Welcome to");
  });

  it("should login successfully", () => {
    cy.wait(1000);
    cy.get('input[id="email"]').type("phidv9855@gmail.com");
    cy.get('input[id="password"]').type("phidv9855@gmail.com");

    cy.getDataCy("login-btn").click();
    // cy.contains(/username or password incorrected/i).should("exist");

    cy.location("pathname").contains("eq", "/auth/login");
  });
});
