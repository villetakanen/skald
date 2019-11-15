describe('Sidebar', () => {
  it('finds Sidebar from e2e site', () => {
    cy.visit('/#/v/e2e-testing/editor-test-page')
    cy.contains('sidebar')
  })
  it('opens Sidebar for editing', () => {
    cy.visit('/#/v/e2e-testing/editor-test-page')
    cy.contains('Edit sidebar').click()
    cy.url().should('include', '/#/e/e2e-testing/sidebar')
  })
})
