class CheckoutPage {

    continueWithoutInfo() {
        cy.get('[data-test="continue"]').highlight().click();
        cy.get('.error-message-container').should('be.visible')
        .contains('Error: First Name is required').highlight();
    }
  
    fillStepOneForm(first, last, postal) {
        cy.get('#first-name').highlight().type(first);
        cy.get('#last-name').highlight().type(last);
        cy.get('#postal-code').highlight().type(postal);
        cy.get('[data-test="continue"]').highlight().click();
    }
  
    finishCheckout() {
        cy.url().should('include', 'checkout-step-two');
        cy.get('[data-test="title"]').contains('Checkout: Overview').highlight();
        cy.get('[data-test="finish"]').contains('Finish').highlight().click();
    }
  
    verifySuccessMessage() {
        cy.url().should('include', 'checkout-complete');
        cy.get('[data-test="checkout-complete-container"]')
            .contains('Thank you for your order!').highlight();
    }
}
  
export default new CheckoutPage();
  