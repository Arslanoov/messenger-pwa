describe("Auth pages", () => {
  it("Visits the app root url", () => {
    cy.visit("/")

    cy.location("pathname").should("eq", "/login")

    cy.contains("h1", "Login")
    cy.contains("label", "Username")
    cy.contains("label", "Password")
    cy.contains("button", "Log In")
  })

  it("Visits the sign up page", () => {
    cy.visit("/login")

    cy.get(".login__link").click()

    cy.location("pathname").should("eq", "/sign-up")

    cy.contains("h1", "Sign Up")
    cy.contains("label", "Username")
    cy.contains("label", "Password")
    cy.contains("label", "Repeat Password")
    cy.contains("button", "Join")
  })
})
