///<reference types = "cypress" />

describe('Swag Labs Automation tests', () => {

    beforeEach(() => {

        // Visit the login page before each test
        cy.visit('https://www.saucedemo.com');

        // Log in with valid credentials
        cy.get('[data-test="username"]').highlight().type('standard_user');
        cy.get('[data-test="password"]').highlight().type('secret_sauce');
        cy.get('[data-test="login-button"]').highlight().click();

        // Confirm navigation to inventory page after login
        cy.url().should('include', 'inventory');
    });

    afterEach(() => {

        // Take a screenshot of the completed test

        cy.screenshot({ capture: 'viewport' });

        // Log out after each test
        cy.get('.bm-burger-button').highlight().click();
        cy.get('.bm-item-list').contains('Logout').highlight().click();

        // Verify that login page is shown
        cy.url().should('be.equal', 'https://www.saucedemo.com/');
    });

    it('Scrolls, selects a random product from drop down list, and logs it', () => {

        // Verify user is on the Products page
        cy.get('[data-test="title"]').contains('Products').highlight();

        // Scroll to bottom to ensure all items are visible
        cy.scrollTo('bottom');

        // Wait for any UI animation or dynamic loading
        cy.wait(1000);

        // Get list of all product name elements
        cy.get('[data-test="inventory-item-name"]').then(($items) => {
            
            const itemCount = $items.length;
            const randomIndex = Math.floor(Math.random() * itemCount);

            // Select a random item from the list
            const selectedItem = $items[randomIndex];
            const itemName = selectedItem.innerText.trim();

            // Log the selected item name in the test runner output
            cy.log(`Randomly selected item: ${itemName}`);

            // Click the randomly selected item to navigate to its details page
            cy.wrap(selectedItem).scrollIntoView().highlight().click();

            // Validate that the URL changed to the item's detail page
            cy.url().should('include', 'inventory-item');
        });
    });

    it('Checks the User information in item confirmation page', () => {

        // Verify user is on the Products page
        cy.get('[data-test="title"]').contains('Products').highlight();

        // Add the first product (Sauce Labs Backpack) to the cart
        cy.get('#add-to-cart-sauce-labs-backpack')
            .contains('Add to cart').highlight().click();

        // Confirm the button changed to "Remove"
        cy.get('#remove-sauce-labs-backpack')
            .contains('Remove').highlight();

        // Go to the shopping cart page
        cy.get('#shopping_cart_container').highlight().click();

        // Confirm cart page loaded and correct product is present
        cy.url().should('include', 'cart');
        cy.contains('Sauce Labs Backpack').highlight();

        // Click the Checkout button
        cy.get('[data-test="checkout"]').contains('Checkout').highlight().click();

        // Ensure we are on checkout step one page
        cy.url().should('include', 'checkout-step-one');

        // Try to continue without filling in user info to trigger error
        cy.get('[data-test="continue"]').highlight().click();

        // Validate that the proper error message is displayed
        cy.get('.error-message-container')
            .should('be.visible')
            .contains('Error: First Name is required')
            .highlight();
    });

    it('Buys an item and checks for the confirmation message "Thank you for your order!"', () => {

        // Verify user is on the Products page
        cy.get('[data-test="title"]').contains('Products').highlight();

        // Add the first item to cart
        cy.get('#add-to-cart-sauce-labs-backpack')
            .contains('Add to cart').highlight().click();

        // Confirm the item is added
        cy.get('#remove-sauce-labs-backpack')
            .contains('Remove').highlight();

        // Go to cart page
        cy.get('#shopping_cart_container').highlight().click();

        // Validate cart contains the correct product
        cy.url().should('include', 'cart');
        cy.contains('Sauce Labs Backpack').highlight();

        // Proceed to checkout
        cy.get('[data-test="checkout"]').contains('Checkout').highlight().click();

        // Fill out checkout step one form
        cy.url().should('include', 'checkout-step-one');
        cy.get('#first-name').highlight().type('Muhabbat');
        cy.get('#last-name').highlight().type('Abduganiyeva');
        cy.get('#postal-code').highlight().type('123456');

        // Continue to next step
        cy.get('[data-test="continue"]').highlight().click();

        // Confirm checkout overview page
        cy.url().should('include', 'checkout-step-two');
        cy.get('[data-test="title"]').contains('Checkout: Overview').highlight();

        // Finish the purchase
        cy.get('[data-test="finish"]').contains('Finish').highlight().click();

        // Confirm success message appears on the completion page
        cy.url().should('include', 'checkout-complete');
        cy.get('[data-test="checkout-complete-container"]')
            .contains('Thank you for your order!')
            .highlight();
    });

    // To select the user from the black box. No need of before each and after hooks. 

    // it('Chooses a random user from the list and enters it', () => {

    //     // Visit the login page
    //     cy.visit('https://www.saucedemo.com');
  
    //     // Get the HTML content of the username list container
    //     cy.get('[data-test="login-credentials"]')
    //     .invoke('html')
    //     .then((html) => {

    //         cy.log('Text before parsing: ' + html);
        
    //         // Remove the heading <h4>Accepted usernames are:</h4>
    //         const cleanedHtml = html.replace(/<h4[^>]*>.*?<\/h4>/i, '');

    //         // Split the remaining HTML by <br>, remove any remaining HTML tags and trim whitespace
    //         const usernames = cleanedHtml
    //             .split('<br>')
    //             .map(u => u.replace(/<[^>]*>/g, '').trim()) // remove HTML tags and spaces
    //             .filter(u => u); // filter out any empty strings

    //         // Log the parsed list of usernames
    //         cy.log('Parsed usernames: ' + JSON.stringify(usernames));

    //         // Pick a random username from the list
    //         const randomUsername = usernames[Math.floor(Math.random() * usernames.length)];
    //         cy.log('Random username: ' + randomUsername);

    //         // Fill in the login form using the selected username
    //         cy.get('[data-test="username"]').type(randomUsername);
    //         cy.get('[data-test="password"]').type('secret_sauce');
    //         cy.get('[data-test="login-button"]').click();
    //     });
    // });

});
