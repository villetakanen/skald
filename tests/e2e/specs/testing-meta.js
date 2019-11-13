describe('Hiding of e2e sites', () => {
  it('Can view the e2e site', () => {
    cy.visit('/#/v/e2e-testing')
  })
  it('Edits a e2e test page, and does not see it in the pagelog', () => {
    cy.visit('/#/e/e2e-testing/e2e-testing')
  })
  it('Edits a e2e test page, and does not see the site in front page', () => {
    cy.visit('/#/e/e2e-testing/e2e-testing')
  })
  it('Does not see e2e site in site listing', () => {
    cy.visit('/#/l/sites')
  })
})
