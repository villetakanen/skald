describe('Page listing', () => {
  it('Views page list of Skald', () => {
    cy.visit('/#/v/skald')
    cy.wait(1000)
    cy.get('img#sitelogo').click()
    cy.wait(1000)
    cy.get('a').contains('Pages').click()
    cy.get('a').contains('About Skald')
  })
})
