describe('Posting actions', () => {
  const testUsername = 'test';
  const testPassword = 'testtest';

  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-cy=login-logout-button').click();

    cy.get('[data-cy=login-input-username]').type(testUsername);
    cy.get('[data-cy=login-input-password]').type(testPassword);
    cy.get('[data-cy=login-button]').click();
  });

  it('Create new topic', () => {
    const newTopicName = 'new test topic';
    const newTopicPost = 'this is a new post on topic';

    cy.contains('test board').click();
    cy.get('[data-cy=hide-new-topic-button]').click();

    cy.get('[data-cy=new-topic-name-input]').type(newTopicName);
    cy.get('[data-cy=new-topic-post-input]').type(newTopicPost);

    cy.contains(newTopicName);
    cy.contains(testUsername);
  });
});
