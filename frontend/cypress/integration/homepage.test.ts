describe('Home page test', () => {
  it('Front page contains header', () => {
    cy.visit('/');
    cy.contains('#main-page-header', 'HOMEPAGE');
  });
});
