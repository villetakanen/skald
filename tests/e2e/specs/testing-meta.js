describe('Hiding of e2e sites', () => {
  it('Can view the e2e site', () => {
    cy.visit('/#/v/e2e-testing')
    cy.wait(1000)
    cy.contains('This string is here to prove that the e2e site exists!')
  })
  it('Edits a e2e test page, and does not see it in the pagelog', () => {
    // login
    cy.visit('/#/testlogin')

    cy.get('#un').type(Cypress.env('TEST_USER_EMAIL'))
    cy.get('#pw').type(Cypress.env('TEST_USER_PASSWORD'))
    cy.get('#login-button').click()

    cy.wait(1000)

    // open editor
    cy.visit('/#/e/e2e-testing/editor-test-page')
    cy.wait(300)
    cy.get('.editor textarea').type('And some more testing')
    cy.get('#save-editor-button').click()

    cy.wait(1000)
    cy.visit('/')
    cy.wait(1000)
    cy.contains('editor-test-page').should('not.exist')
  })
  it('Does not see e2e site in site listing', () => {
    cy.visit('/#/l/sites')
    cy.wait(1000)
    cy.contains('e2e-testing').should('not.exist')
  })
})
