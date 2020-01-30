describe('Happy Path Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should find the words correctly', () => {
    cy.get('[data-cy="input-letter-grid"]')
      .first()
      .type('catz\nagod\nnalt\nlobg');

    cy.get('[data-cy="input-word-guess"]')
      .first()
      .type('cat');
    cy.get('[data-cy="button-add-word"]')
      .first()
      .click();
    cy.get('[data-cy="input-word-guess"]')
      .first()
      .type('dog');
    cy.get('[data-cy="button-add-word"]')
      .first()
      .click();
    cy.get('[data-cy="input-word-guess"]')
      .first()
      .type('lot');
    cy.get('[data-cy="button-add-word"]')
      .first()
      .click();
    cy.get('[data-cy="input-word-guess"]')
      .first()
      .type('can');
    cy.get('[data-cy="button-add-word"]')
      .first()
      .click();
    cy.get('[data-cy="input-word-guess"]')
      .first()
      .type('some');
    cy.get('[data-cy="button-add-word"]')
      .first()
      .click();

    cy.get('[data-cy="button-desktop-solve"]')
      .first()
      .click();

    cy.get('[data-cy="found-word-cat"]')
      .should('be.visible')
      .and('contain.text', 'cat(1, 1)(3, 1)');
    cy.get('[data-cy="found-word-dog"]')
      .should('be.visible')
      .and('contain.text', 'dog(4, 2)(2, 2)');
    cy.get('[data-cy="found-word-lot"]')
      .should('be.visible')
      .and('contain.text', 'lot(3, 3)(3, 1)');
    cy.get('[data-cy="found-word-can"]')
      .should('be.visible')
      .and('contain.text', 'can(1, 1)(1, 3)');
    cy.get('[data-cy="found-word-some"]')
      .should('be.visible')
      .and('contain.text', 'some--');
  });
});
