describe('Booking form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/book-appointment');
  });

  it('exists on booking page', () => {
    cy.get('[data-testid="booking-form"]').should('exist');
  });

  it('validates inputs', () => {
    cy.get('[data-testid="book-button"]').click();
    cy.get('[data-testid="input-validation-error"]').should('have.length', 4);
    cy.get('[data-testid="textarea-validation-error"]').should(
      'have.length',
      1
    );
    cy.get('[data-testid="input-firstname"]').type('name');
    cy.get('[data-testid="input-lastname"]').type('lastname');
    cy.get('[data-testid="input-email"]').type('email');
    cy.get('[data-testid="input-phoneNumber"]').type('3456');
    cy.get('[data-testid="input-message"]').type('message');
    cy.get('[data-testid="book-button"]').click();
    cy.get('[data-testid="input-validation-error"]').should('have.length', 1);
    cy.get('[data-testid="input-validation-error"]').contains(/email/i);
    cy.get('[data-testid="input-email"]').type('@email.com');
    cy.get('[data-testid="book-button"]').click();
    cy.get('[data-testid="dialog"]').should('exist');
    cy.get('[data-testid="input-validation-error"]').should('not.exist');
  });
});
