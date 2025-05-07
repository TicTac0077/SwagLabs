class InventoryPage {

    verifyTitle() {
        // Verify user is on the Products page
        cy.get('[data-test="title"]').contains('Products').highlight();
    }
  
    scrollToBottom() {
        // Scroll to bottom to ensure all items are visible
        cy.scrollTo('bottom');
        cy.wait(1000);
    }
  
    selectRandomItem() {
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
    }
  
    addBackpackToCart() {
        cy.get('#add-to-cart-sauce-labs-backpack').contains('Add to cart').highlight().click();
    }
  
    verifyRemoveButton() {
        cy.get('#remove-sauce-labs-backpack').contains('Remove').highlight();
    }
  
    goToCart() {
        cy.get('#shopping_cart_container').highlight().click();
    }
  
    logout() {
        cy.get('.bm-burger-button').highlight().click();
        cy.get('.bm-item-list').contains('Logout').highlight().click();
        cy.url().should('be.equal', 'https://www.saucedemo.com/');
    }
}
  
export default new InventoryPage();
  

  
      