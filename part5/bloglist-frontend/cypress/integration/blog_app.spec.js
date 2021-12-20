describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.visit("http://localhost:3000");
  });

  it("Should show login form", function () {
    cy.contains("login");
    cy.contains("username");
    cy.contains("password");
    cy.get("button");
  });
});
