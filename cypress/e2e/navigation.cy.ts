import { routes } from '@/constants/router';

describe('navigation', () => {
  before(() => {
    cy.visit('http://localhost:3000');
    cy.viewport(2000, 1000);
  });

  it('links forward to correct paths', () => {
    const paths = Object.keys(routes).map((route) => routes[route].path);

    for (let i = 0; i < paths.length; i++) {
      cy.get(`[data-testid="navlink-${paths[i]}"]`).should('exist');
      cy.get(`[data-testid="navlink-${paths[i]}"]`).click();
      cy.location().should((loc) => {
        expect(loc.pathname).to.equal(paths[i]);
      });
    }
  });
});
