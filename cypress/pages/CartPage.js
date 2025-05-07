class CartPage {
    
    verifyCartItem() {
        cy.url().should('include', 'cart');
        cy.contains('Sauce Labs Backpack').highlight();
    }
  
    clickCheckout() {
        cy.get('[data-test="checkout"]').contains('Checkout').highlight().click();
    }
}
  
export default new CartPage();
  