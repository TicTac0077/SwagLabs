///<reference types="cypress" />

import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';

describe('Swag Labs Automation tests', () => {

    beforeEach(() => {
        LoginPage.visit();
        LoginPage.login('standard_user', 'secret_sauce');

        // Confirm navigation to inventory page after login
        cy.url().should('include', 'inventory');
    });

    afterEach(() => {
        cy.screenshot({ capture: 'viewport' });
        InventoryPage.logout();
    });

    it('Scrolls, selects a random product from drop down list, and logs it', () => {
        InventoryPage.verifyTitle();
        InventoryPage.scrollToBottom();
        InventoryPage.selectRandomItem();
    });

    it('Checks the User information in item confirmation page', () => {
        InventoryPage.verifyTitle();
        InventoryPage.addBackpackToCart();
        InventoryPage.verifyRemoveButton();
        InventoryPage.goToCart();
        CartPage.verifyCartItem();
        CartPage.clickCheckout();

        cy.url().should('include', 'checkout-step-one');
        CheckoutPage.continueWithoutInfo();
    });

    it('Buys an item and checks for the confirmation message "Thank you for your order!"', () => {
        InventoryPage.verifyTitle();
        InventoryPage.addBackpackToCart();
        InventoryPage.verifyRemoveButton();
        InventoryPage.goToCart();
        CartPage.verifyCartItem();
        CartPage.clickCheckout();

        cy.url().should('include', 'checkout-step-one');
        CheckoutPage.fillStepOneForm('Muhabbat', 'Abduganiyeva', '123456');

        CheckoutPage.finishCheckout();
        CheckoutPage.verifySuccessMessage();
    });

});
