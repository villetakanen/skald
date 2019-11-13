describe('Attachments can be seen and edited', () => {
  it('views an attachment at a test site', () => {
    cy.visit('/#/v/e2e-testing/attachments')
    cy.wait(1000)
    cy.get('img.attachment')
  })
  it('views an attachment add box at a test site', () => {
    cy.visit('/#/v/e2e-testing/attachments')
    cy.wait(1000)
    cy.contains('e2e-testing/this does not exist.png not found.')
  })
})
/* describe('Editor as logged in user', () => {
    it('logs in', () => {
      // login
      cy.visit('/#/testlogin')

      cy.get('#un').type(Cypress.env('TEST_USER_EMAIL'))
      cy.get('#pw').type(Cypress.env('TEST_USER_PASSWORD'))
      cy.get('#login-button').click()

      cy.wait(300)

      cy.url().should('eq', 'http://localhost:8080/#/')
    }) */
