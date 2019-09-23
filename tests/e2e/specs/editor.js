describe('Editor as logged in user', () => {
  it('logs in and opens editor', () => {
    cy.visit('/#/testlogin')
    cy.get('#un').type(Cypress.env('TEST_USER_EMAIL'))
    cy.get('#pw').type(Cypress.env('TEST_USER_PASSWORD'))
    cy.get('#login-button').click()
  })
})
