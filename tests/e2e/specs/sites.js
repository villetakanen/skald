describe('Site listings', () => {
  it('Views site listings page', () => {
    cy.visit('/')
    cy.wait(1000)
    cy.get('img#sitelogo').click()
    cy.contains('All sites').click()
    cy.wait(1000)
    cy.contains('A Role-playing Game Wiki')
    cy.contains('Roolipelitermejä ja käännöksiä')
  })
})
