import "cypress-localstorage-commands"

Cypress.Commands.add("login", () => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("apiUrl")}/token`,
    body: {
      username: Cypress.env("username"),
      password: Cypress.env("password"),
      grant_type: "password",
      client_id: "oauth",
      client_secret: "secret",
      access_type : "offline"
    },
    form: true
  })
    .then(response => cy.setLocalStorage("token", response.body.access_token))
})
