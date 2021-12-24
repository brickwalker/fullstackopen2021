const users = [
  {
    username: "brickwalker",
    name: "Artem Nedostup",
    password: "1a2b3c4d",
  },
  {
    username: "alpish",
    name: "Sasha P",
    password: "4a3b2c1d",
  },
];

const blogs = [
  {
    title: "Most amusing blog",
    author: "Creative Person",
    url: "https://mostamusingblog.com",
    likes: 10,
  },
  {
    title: "Tie your laces",
    author: "Lace Guru",
    url: "https://lace.com",
    likes: 11,
  },
];

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users", users[0]);
    cy.request("POST", "http://localhost:3003/api/users", users[1]);
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
      cy.contains("username").type(users[0].username);
      cy.contains("password").type(users[0].password);
      cy.get("button").click();
      cy.contains(`${users[0].name} is logged in`);
    });

    it("should fail with wrong credentials", function () {
      cy.contains("username").type(users[0].username);
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
        username: users[0].username,
        password: users[0].password,
      }).then((response) => {
        localStorage.setItem("bloglistUser", JSON.stringify(response.body));
        cy.visit("http://localhost:3000");
      });
    });

    it("should create blog", function () {
      cy.contains("create new blog").click();
      cy.contains("title").type(blogs[0].title);
      cy.contains("author").type(blogs[0].author);
      cy.contains("url").type(blogs[0].url);
      cy.contains("add").click();
      cy.contains(`${blogs[0].title} - ${blogs[0].author}`);
    });

    describe("When blogs created", function () {
      beforeEach(function () {
        const userString = localStorage.getItem("bloglistUser");
        const userObject = JSON.parse(userString);
        cy.request({
          url: "http://localhost:3003/api/blogs",
          method: "POST",
          auth: { bearer: userObject.token },
          body: blogs[0],
        });
        cy.request({
          url: "http://localhost:3003/api/blogs",
          method: "POST",
          auth: { bearer: userObject.token },
          body: blogs[1],
        });
        cy.reload();
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000);
      });

      it("should be able to like blog", function () {
        cy.contains(blogs[0].title).contains("view").click();
        cy.contains(blogs[0].title).contains("like").click();
        cy.contains(`likes ${blogs[0].likes + 1}`);
      });
      it("should be able to delete own blog", function () {
        cy.contains(blogs[0].title).contains("view").click();
        cy.contains(blogs[0].title).contains("delete").click();
        cy.get("body").should("not.contain", blogs[0].title);
      });

      describe("Blogs display", function () {
        beforeEach(function () {
          cy.get("button:contains(view)").click({ multiple: true });
        });

        it("should have blog with most likes on top", function () {
          const likes = [];
          cy.get("div.toggleExpanded:contains(likes)").then((result) => {
            // jQuery syntax where index is first and element is second
            result.map((i, el) => {
              likes.push(parseInt(el.innerText.match(/likes\s(\d+)/)[1]));
            });

            for (let index = 0; index < likes.length; index++) {
              if (index === 0) {
                cy.wrap(likes[index]).should("be.at.least", 0);
              } else {
                cy.wrap(likes[index]).should(
                  "be.at.most",
                  likes[index - 1]
                );
              }
            }
          });
        });
      });

      describe("When different user logged in", function () {
        beforeEach(function () {
          cy.contains("logout").click();
          cy.contains("username").type(users[1].username);
          cy.contains("password").type(users[1].password);
          cy.get("button").click();
          cy.contains(`${users[1].name} is logged in`);
        });
        it("should not be able to delete blog added by other user", function () {
          cy.contains(blogs[0].title).contains("view").click();
          cy.contains(blogs[1].title).contains("view").click();
          cy.get("body").should("not.contain", "delete");
        });
      });
    });
  });
});
