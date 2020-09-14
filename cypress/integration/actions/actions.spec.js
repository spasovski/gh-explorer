/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5000')
  })

  // https://on.cypress.io/interacting-with-elements

  it('type and clear an organization name in the text input', () => {
    // https://on.cypress.io/type
    cy.get('#org-name-input')
      .clear()
      .type('mozilla').should('have.value', 'mozilla')
      .clear()
      .should('have.value', '')
  })

  it('submit the organization change form (empty org)', () => {
    cy.get('#org-name-input').clear()
    cy.get('.org-form').submit()
    cy.get('h2').should('contain', 'netflix repositories')
  })

  it('submit the organization change form (valid org)', () => {
    // https://on.cypress.io/submit
    cy.get('.org-form')
      .find('#org-name-input').clear().type('google')

    cy.get('.org-form').submit()
    cy.get('h2').should('contain', 'google repositories')

    cy.get('.repo-table tr').should('have.length', 101)
  })

  it('submit the organization change form (invalid org)', () => {
    cy.get('#org-name-input').clear()
      .type('kjdfhg')
    cy.get('.org-form').submit()
    cy.get('.error').should('contain', 'Not Found')
  })

  it('page change -> next page', () => {
    cy.get('.paginator .next button').click()
    cy.get('.paginator .current-page em').should('contain', '2')
  })

  it('sort by number of forks', () => {
    cy.get('.btn-sort').click()
    cy.get('.reset-sort').should('be.visible')
  })

  it('reset sort -> clears ui button, clears sort direction', () => {
    cy.get('.btn-sort').click()
    cy.get('.reset-sort').click()
    cy.get('.btn-sort').should('not.have.class', 'desc')
  })

})
