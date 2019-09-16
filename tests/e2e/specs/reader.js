describe('Reader for skald.skald', () => {
  it('Opens reader with url', () => {
    cy.visit('/#/v/skald')

    // There is a header
    cy.get('div.reader')
    // There and some content, in a wikipage
    cy.get('.wikipage')

    cy.get('div.changelog').children().should('have.length', 11)
    cy.get('div.changelog').children().contains('a')
  })

  it('Sees the slogan on meta-welcome-page', () => {
    cy.visit('/#/v/skald/skald')
    cy.contains('A wiki for RPG material')
  })
})
