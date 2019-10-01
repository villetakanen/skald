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
    cy.get('saveDescriptionButton').should('not.exist')
  })
})
