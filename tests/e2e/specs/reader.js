describe('Reader for skald.skald', () => {
  it('Opens reader with url', () => {
    cy.visit('/v/skald')

    cy.contains('div.reader')
    // There is a header
    cy.get('div.reader').children().contains('h1')
    // There and some content, in a wikipage
    cy.get('div.reader').children().contains('div.wikipage')
    cy.get('div.wikipage').children().contains('p')

    cy.get('div.changelog').children().should('have.length', 11)
    cy.get('div.changelog').children().contains('a')
  })
})
