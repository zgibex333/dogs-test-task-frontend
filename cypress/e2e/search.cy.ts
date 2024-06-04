describe('search', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/info');
  });

  it('works with incorrect input data', () => {
    cy.get('[data-testid="search-input"]').type('abrakadabra');
    cy.get('[data-testid="search-no-results"]').should('exist');
  });

  it('works with correct input data', () => {
    cy.get('[data-testid="search-input"]').type('spitz');
    cy.get('[data-testid="search-result"]')
      .its('length')
      .should('be.greaterThan', 2);
    cy.get('[data-testid="search-input"]').clear();
    cy.get('[data-testid="search-input"]').type('golden retriever');
    cy.get('[data-testid="search-result"]').should('have.length', 1).click();
    cy.location('pathname').should(($pathname) => {
      expect($pathname.toLowerCase()).to.include('retriever'.toLowerCase());
    });
  });
});
