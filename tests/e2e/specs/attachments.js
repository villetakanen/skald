describe('Image uploads', () => {
  it('Browses a page with an image upload', () => {
    cy.visit('/#/v/e2e-testing/attachments')
    cy.get('[alt="e2e-testing/test.jpg"]').should('exist')
  })

  it('Browses a page with a missing image, as anonymous', () => {
    cy.visit('/#/v/e2e-testing/attachments')
    cy.wait(1000)
    cy.get('.button-add-image').should('not.exist')
  })

  it('Browses a page with a missing image, with edit rights', () => {
    cy.visit('/#/testlogin')

    cy.get('#un').type(Cypress.env('TEST_USER_EMAIL'))
    cy.get('#pw').type(Cypress.env('TEST_USER_PASSWORD'))
    cy.get('#login-button').click()

    cy.wait(3000)

    cy.visit('/#/v/e2e-testing/attachments')
    cy.wait(1000)
    cy.get('.button-add-image').should('exist')

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
  it('Browses a page with a file upload', () => {
    cy.visit('/#/v/e2e-testing/uploads')
    cy.contains('example_character_sheet.pdf')
  })

  it('Browses a page with a missing file, as anonymous', () => {
    cy.visit('/#/v/e2e-testing/uploads')
    cy.wait(1000)
    cy.get('.button-add-file').should('not.exist')
  })

  it('Browses a page with a missing file, with edit rights', () => {
    cy.visit('/#/testlogin')

    cy.get('#un').type(Cypress.env('TEST_USER_EMAIL'))
    cy.get('#pw').type(Cypress.env('TEST_USER_PASSWORD'))
    cy.get('#login-button').click()

    cy.wait(3000)

    cy.visit('/#/v/e2e-testing/uploads')
    cy.wait(1000)
    cy.get('.button-add-file').should('exist')

    cy.get('#account-menu-button').click()
    cy.get('#logout-button').click()
  })

  it('Checks the list of attached files, as anonyous', () => {
    cy.visit('/#/l/attachments/e2e-testing')
    cy.wait(1000)
    cy.get('.button-delete').should('not.exist')
  })

  it('Checks the list of attached files, with edit rights', () => {
    cy.visit('/#/testlogin')

    cy.get('#un').type(Cypress.env('TEST_USER_EMAIL'))
    cy.get('#pw').type(Cypress.env('TEST_USER_PASSWORD'))
    cy.get('#login-button').click()

    cy.wait(3000)

    cy.visit('/#/l/attachments/e2e-testing')
    cy.wait(1000)
    cy.get('.button-delete').should('exist')
    cy.get('.button-add-file').should('exist')

    cy.get('#account-menu-button').click()
    cy.get('#logout-button').click()
  })
})
