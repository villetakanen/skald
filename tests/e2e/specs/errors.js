describe('Error dialogs', () => {
  it('Tries to access non existant site', () => {
    cy.visit('/#/v/non-existant-site-3214309823075757788834773222111') // higly likely will not be created  by a user :D
    cy.wait(1000)
    cy.contains('An Error occured.')
  })
  it('Tries to access non existing page', () => {
    cy.visit('/#/v/e2e-testing/non-existant-page-3214309823075757788834773222111') // higly likely will not be created  by a user :D
    cy.wait(1000)
    cy.contains('The page e2e-testing/non-existant-page-3214309823075757788834773222111 was not found, do you want to create it?')
  })
})
