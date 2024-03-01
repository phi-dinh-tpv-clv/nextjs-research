describe("Various examples", () => {
  beforeEach(() => {
    cy.visit("/examples");
  });

  it("Multi page testing", () => {
    cy.getDataTest("nav-why-cypress").click();
    cy.location("pathname").should("equal", "/");

    cy.getDataTest("nav-overview").click();
    cy.location("pathname").should("equal", "/overview");

    cy.getDataTest("nav-fundamentals").click();
    cy.location("pathname").should("equal", "/fundamentals");

    cy.getDataTest("nav-forms").click();
    cy.location("pathname").should("equal", "/forms");
  });

  it("intercepts", () => {
    cy.intercept("post", "http://localhost:3000/examples", {
      fixture: "example.json",
    });

    cy.getDataTest("post-button").click();
  });

  it.only("budges", () => {
    cy.contains(/add some grudges/i);
    cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", 0);
    });

    cy.getDataTest("grudge-input").within(() => {
      cy.get("input").type("grudge input 1");
    });
    cy.getDataTest("add-grudge-button").click();

    cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", 1);
    });

    cy.getDataTest("grudge-input").within(() => {
      cy.get("input").type("grudge input 2");
    });
    cy.getDataTest("add-grudge-button").click();

    cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", 2);
      cy.get("li").its(0).should("contain.text", "grudge input 1");
    });

    cy.getDataTest("clear-button").click();
    cy.getDataTest("grudge-list").within(() => {
      cy.get("li").should("have.length", 0);
    });
  });
});
