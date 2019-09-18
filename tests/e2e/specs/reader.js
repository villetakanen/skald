describe('Reader for skald.skald', () => {
  it('Opens a site front page', () => {
    cy.visit('/#/v/skald')

    // There and some content, in a wikipage
    cy.get('.wikipage')

    cy.get('div.changelog').children().should('have.length', 11)
    cy.get('div.changelog').children().contains('a')
  })

  it('Sees the slogan on meta-welcome-page for skald', () => {
    cy.visit('/#/v/skald/skald')
    cy.contains('A wiki for RPG material')
  })

  it('Can read a wikipage in reader component', () => {
    cy.visit('/#/v/skald/about')
    cy.get('div.reader')
  })
})
