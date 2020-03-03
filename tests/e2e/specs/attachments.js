describe('Image uploads', () => {
  it('Browses a page with an image upload', () => {
    cy.visit('/#/v/e2e-testing/attachments')
    cy.get('[alt="e2e-testing/test.jpg"]').should('exist')
  })

  it('Browses a page with a missing image, as anonymous', () => {
    cy.visit('/#/v/e2e-testing/attachments')
    cy.wait(1000)
    cy.get('.add-image-button').should('not.exist')
  })

  it('Browses a page with a missing image, with edit rights', () => {
    cy.visit('/#/testlogin')

    cy.get('#un').type(Cypress.env('TEST_USER_EMAIL'))
    cy.get('#pw').type(Cypress.env('TEST_USER_PASSWORD'))
    cy.get('#login-button').click()

    cy.wait(3000)

    cy.visit('/#/v/e2e-testing/attachments')
    cy.wait(1000)
    cy.get('.add-image-button').should('exist')

    cy.get('#account-menu-button').click()
    cy.get('#logout-button').click()
  })

  it('Checks the list of attached images, as anonyous', () => {
    cy.visit('/#/l/attachments/e2e-testing')
    cy.wait(1000)
    cy.get('.button-delete').should('not.exist')
  })

  it('Checks the list of attached images, with edit rights', () => {
    cy.visit('/#/testlogin')

    cy.get('#un').type(Cypress.env('TEST_USER_EMAIL'))
    cy.get('#pw').type(Cypress.env('TEST_USER_PASSWORD'))
    cy.get('#login-button').click()

    cy.wait(3000)

    cy.visit('/#/l/attachments/e2e-testing')
    cy.wait(1000)
    cy.get('.button-delete').should('exist')

    cy.get('#account-menu-button').click()
    cy.get('#logout-button').click()
  })
})
describe('File uploads', () => {
  it('Browses a page with a file upload')
  it('Browses a page with a missing file, as anonymous')
  it('Browses a page with a missing file, with edit rights')
  it('Checks the list of attached files, as anonyous')
  it('Checks the list of attached files, with edit rights')
})
/* describe('Attachments can be seen and edited', () => {
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
}) */
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
