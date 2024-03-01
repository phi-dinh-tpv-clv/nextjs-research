describe("Create new task suite", () => {
  beforeEach(() => {
    cy.visit("/auth/login");
  });
  it("Login success", () => {
    cy.loginViaUser({ email: "test@gmail.com", password: "123456" });
    cy.url().should("include", "/task-management");

    cy.get("[data-cy='add-task-btn']").click();
    cy.get("#title").type("New Task");
    cy.get("#description").type("New Description");
    cy.get("[data-cy='select-input']").click();
    cy.get("[data-cy='option-eb11dd2d-73b0-41f8-b2ae-d359a48b0156']").click();
    cy.get("[data-cy='combo-input']").click();
    cy.get("[data-cy='combo-search']").type("e");
    cy.get("[data-cy='search-results']");
    cy.get("[data-cy='combobox-item']").eq(0).click();
  });
});
