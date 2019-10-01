describe('Anonymous user Site settings', () => {
  it('Opens a site settings page', () => {
    cy.visit('/#/c/site/skald')
  })
  it('Sees owners, and no edit buttons', () => {
    cy.contains('villetakanen')
    cy.get('.mdi-close-circle').should('not.exist')
  })
  it('Sees description, and no edit buttons', () => {
    cy.contains('A Role-playing Game Wiki')
    cy.get('#saveDescriptionButton').should('not.exist')
  })
})
describe('Logged in user Site settings', () => {
  it('logs in, and opens site settings page', () => {
    // login
    cy.visit('/#/testlogin')

    cy.get('#un').type(Cypress.env('TEST_USER_EMAIL'))
    cy.get('#pw').type(Cypress.env('TEST_USER_PASSWORD'))
    cy.get('#login-button').click()

    cy.wait(3000)

    cy.visit('/#/c/site/e2e-testing')
  })
  it('Sees owners, and edit buttons', () => {
    cy.contains('villetakanen')
    cy.get('.mdi-close-circle')
  })
  it('Sees description edit buttons', () => {
    cy.get('#saveDescriptionButton')
  })
  it('logs out and can no longer see edit buttons', () => {
    cy.get('.mdi-account').click()
    cy.wait(300)
    cy.contains('Welcome Test User 37')
    cy.get('#logout-button').click()

    cy.contains('An end to end test site')
    cy.get('saveDescriptionButton').should('not.exist')
  })
})
