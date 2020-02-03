/**
 * This spec is mainly for verifying the main navigation works, and all
 * parts of the site are functional.
 */
describe('Sidebar works as intented', () => {
  it('Does not see sidebar by default', () => {
    cy.visit('/#/v/skald')
    cy.get('.mdi-home').should('exist')
    cy.get('.mdi-home').should('not.be.visible')
    cy.get('.v-app-bar__nav-icon').click()
    cy.get('.mdi-home').should('be.visible')
  })
  // Pages tested below, skipping here
  // Add page tested below, skipping here
  it('Opens Attachments page', () => {
    cy.visit('/#/v/skald')
    cy.get('.v-app-bar__nav-icon').click()
    cy.get('#navi-attachment-list-link').click()
    cy.wait(3000)
    // These attachments should always exist
    cy.contains('logo.svg')
    cy.contains('[wiki:demo.jpg]')
  })
  it('Opens Site Settings', () => {
    cy.visit('/#/v/skald')
    cy.get('.v-app-bar__nav-icon').click()
    cy.get('#navi-site-settings-link').click()
    cy.contains('Site Settings')
  })
})
describe('Page listing is fuctional', () => {
  it('Opens page listing', () => {
    cy.visit('/#/v/skald')
    cy.get('.v-app-bar__nav-icon').click()
    cy.get('#nav-page-list-link').click()
    cy.wait(3000)
    // These pages should always exist
    cy.contains('Getting Started')
    cy.contains('About Skald')
    cy.contains('Welcome to Skald')
  })
})
describe('Add a page dialog', () => {
  it('sees the add a page dialog', () => {
    cy.visit('/#/v/skald')
    cy.get('.v-app-bar__nav-icon').click()
    cy.get('#navi-add-page-action').click()
    // do note, the last part there is the name of the site
    // fetched from the Vuex store
    cy.contains('URL: mekanismi.web.app/#/v/skald/')
  })
})
