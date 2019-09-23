describe('Editor as logged in user', () => {
  it('logs in', () => {
    // login
    cy.visit('/#/testlogin')

    cy.get('#un').type(Cypress.env('TEST_USER_EMAIL'))
    cy.get('#pw').type(Cypress.env('TEST_USER_PASSWORD'))
    cy.get('#login-button').click()

    cy.wait(500)

    cy.url().should('eq', 'http://localhost:8080/#/')
  })
  it('logs in and opens editor', () => {
    // open editor
    cy.visit('/#/e/skald/sandbox')
    cy.get('.editor')
  })
  it('logs out and can no longer see the editor', () => {
    cy.get('.mdi-account').click()
    cy.wait(100)
    cy.contains('Welcome Test User 37')
    cy.get('#logout-button').click()

    cy.visit('/#/e/skald/sandbox')
    cy.wait(500)
    cy.get('.editor').should('not.exist')
  })
})
