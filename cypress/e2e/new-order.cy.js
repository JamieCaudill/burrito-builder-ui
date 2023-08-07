describe('new order', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/')
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {fixture: 'orders.json'}).as('getOrders')
    cy.intercept({
      method: 'POST', 
      url: 'http://localhost:3001/api/v1/orders',
    },
    {id: 4, name: 'Bill Test', ingredients: ['beans', 'lettuce']}).as('postOrder')
  })
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
      statusCode: 500,
    }).as('badPost')
  it('should show a message if no ingredients are selected', () => {
    cy.get('p').should('have.text', 'Order: Nothing selected')
  })
  it('should be a controlled form that posts and displays inputs on submit', () => {
    cy.get('.name-input').type('Bill Test').should('have.value', 'Bill Test')
    cy.get('[name="beans"]').click()
    cy.get('[name="lettuce"]').click()
    cy.get('.submit-btn').click()
    cy.wait('@postOrder')
    cy.get('section > :nth-child(4)').contains('Bill Test')
    cy.get(':nth-child(4) > .ingredient-list > :nth-child(1)').contains('beans')
    cy.get(':nth-child(4) > .ingredient-list > :nth-child(2)').contains('lettuce')
  })
  it('should show and error if a name or no ingredients are given', () => {
    cy.wait('@getOrders')
    cy.get('.submit-btn').click()
    cy.get('h2').should('have.text', 'Please enter a name and at least one ingredient');
  })
})
