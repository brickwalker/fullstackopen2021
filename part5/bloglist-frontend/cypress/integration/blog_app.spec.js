const user = {
  username: "brickwalker",
  name: "Artem Nedostup",
  password: "1a2b3c4d",
};

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("Should show login form", function () {
    cy.contains("login");
    cy.contains("username");
    cy.contains("password");
    cy.get("button");
  });

  describe("Login", function () {
    it("should succeed with correct credentials", function () {
      cy.contains("username").type(user.username);
      cy.contains("password").type(user.password);
      cy.get("button").click();
      cy.contains("Artem Nedostup is logged in");
    });

    it("should fail with wrong credentials", function () {
      cy.contains("username").type(user.username);
      cy.contains("password").type("wrongPassword");
      cy.get("button").click();
      cy.get(".error")
        .should("contain", "Login unsuccessful")
        .and("have.css", "color", "rgb(139, 0, 0)");
    });
  });
});
