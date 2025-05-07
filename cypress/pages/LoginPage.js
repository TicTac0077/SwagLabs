class LoginPage {

  visit() {

      // Visit the login page before each test
      cy.visit('https://www.saucedemo.com');
  }
  
  login(username, password) {
    
    // Log in with valid credentials
    cy.get('[data-test="username"]').highlight().type(username);
    cy.get('[data-test="password"]').highlight().type(password);
    cy.get('[data-test="login-button"]').highlight().click();
  }
  
}
  
export default new LoginPage();
