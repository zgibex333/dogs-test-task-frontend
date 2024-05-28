describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="navlink-/about"]')
      .should('exist')
      .contains(/about us/i)
      .click();
  });

  it('passes', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="navlink-/info"]')
      .should('exist')
      .contains(/info/i)
      .click();

    cy.get('[data-testid="search-input"]')
      .should('exist')
      .focus()
      .type('golden retriever');
  });
});
