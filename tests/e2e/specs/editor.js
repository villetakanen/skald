describe('Editor as logged in user', () => {
  it('logs in', () => {
    // login
    cy.visit('/#/testlogin')

    cy.get('#un').type(Cypress.env('TEST_USER_EMAIL'))
    cy.get('#pw').type(Cypress.env('TEST_USER_PASSWORD'))
    cy.get('#login-button').click()

    cy.wait(300)

    cy.url().should('eq', 'http://localhost:8080/#/')
  })
  it('logs in and opens editor', () => {
    // login
    cy.visit('/#/testlogin')

    cy.get('#un').type(Cypress.env('TEST_USER_EMAIL'))
    cy.get('#pw').type(Cypress.env('TEST_USER_PASSWORD'))
    cy.get('#login-button').click()

    cy.wait(1000)

    // open editor
    cy.visit('/#/e/skald/sandbox')
    cy.wait(300)
    cy.get('.editor')
  })
  it('logs out and can no longer see the editor', () => {
    cy.get('.mdi-account').click()
    cy.wait(100)
    cy.contains('Welcome Test User 37')
    cy.get('#logout-button').click()

    cy.visit('/#/e/skald/sandbox')
    cy.wait(300)
    cy.get('.editor').should('not.exist')
  })
  it('Adds a page to wiki', () => {
  })
  it('Deletes a page from wiki', () => {

  }) 
  it('Creates a new page with editor, and deletes it', () => {
    // Login
    cy.visit('/#/testlogin')
    cy.get('#un').type(Cypress.env('TEST_USER_EMAIL'))
    cy.get('#pw').type(Cypress.env('TEST_USER_PASSWORD'))
    cy.get('#login-button').click()
    cy.wait(1000)

    // Create page
    cy.visit('/#/v/e2e-testing')
    cy.wait(1000)
    cy.get('.v-app-bar__nav-icon').click() // Open the sidebar navigation
    cy.get('#navi-add-page-action').click()
    cy.wait(300)
    cy.get('#new-page-name').type('testing page creation')
    // @TODO: the actual creation-deletion test
  })
})
