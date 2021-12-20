const user = {
  username: "brickwalker",
  name: "Artem Nedostup",
  password: "1a2b3c4d",
};

const blog = {
  title: "Most amusing blog",
  author: "Creative Person",
  url: "https://mostamusingblog.com"
}

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

  describe("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3003/api/login", {
        username: user.username,
        password: user.password,
      }).then((response) => {
        localStorage.setItem("bloglistUser", JSON.stringify(response.body));
        cy.visit("http://localhost:3000");
      });
    });

    it("should create blog", function () {
      cy.contains("create new blog").click()
      cy.contains("title").type(blog.title)
      cy.contains("author").type(blog.author)
      cy.contains("url").type(blog.url)
      cy.contains("add").click()
      cy.contains(`${blog.title} - ${blog.author}`)
    })
  });
});
