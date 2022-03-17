const testUsername = 'test';
const testPassword = 'testtest';

describe('Login & signup', () => {
  beforeEach(() => cy.visit('/'));

  it('Log in', () => {
    cy.get('[data-cy=login-logout-button').click();

    cy.get('[data-cy=login-input-username]').type(testUsername);
    cy.get('[data-cy=login-input-password]').type(testPassword);
    cy.get('[data-cy=login-button]').click();

    cy.contains('[data-cy=logged-in-as]', `Logged-in as ${testUsername}`);
  });

  it('Sign up', () => {
    const username = 'TestPerson';

    cy.get('[data-cy=sign-up-button-navbar]').click();

    cy.get('[data-cy=username-input]').type(username);
    cy.get('[data-cy=password-input]').type('password');
    cy.get('[data-cy=sign-up-button]').click();

    cy.contains('[data-cy=logged-in-as]', `Logged-in as ${username}`);
  });

  it('Log out', () => {
    cy.request('POST', '/api/user/login', {
      username: testUsername,
      password: testPassword
    });

    cy.get('[data-cy=login-logout-button]').click();
    cy.get('[data-cy=sign-up-button-navbar]').should('be.visible');
  });
});
