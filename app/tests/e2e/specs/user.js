describe("User", () => {
  before(() => {
    cy.login()
    cy.saveLocalStorage()
  })

  beforeEach(() => {
    cy.restoreLocalStorage()
  })

  it("Visits profile", () => {
    cy.visit("/")

    cy.contains("div", Cypress.env("username"))

    cy.visit("/profile")

    cy.contains("h1", "Profile")
  })
})
