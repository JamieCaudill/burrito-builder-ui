describe("home page", () => {
  beforeEach(() => {
    cy.visit('localhost:3000/')
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {fixture: 'orders.json'}).as('getOrders')
  })
  it("should display a header", () => {
    cy.get('h1').contains('Burrito Builder')
  });
  it("should display a form", () => {
    cy.get('form').should('be.visible')
    cy.get('.name-input').should('be.visible')
    cy.get('button').should('have.length', 13)
    cy.get('button').first().contains('beans')
    cy.get('button').last().contains('Submit Order')
  })
  it("should display orders", () => {
    cy.get('.order').should('have.length', 3)
    cy.get('.order').first().contains('Pat Test')
    cy.get('.order').last().contains('Alex Test')
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(1)').contains('beans')
    cy.get(':nth-child(1) > .ingredient-list').children().should('have.length', 5)
  })
});
