// https://docs.cypress.io/api/introduction/api.html

describe('Front page', () => {
  it('Checks the latest changes list', () => {
    cy.visit('/')
    cy.get('div.changelog').children().should('have.length', 11)
    cy.get('div.changelog').children().contains('a')
  })
})
