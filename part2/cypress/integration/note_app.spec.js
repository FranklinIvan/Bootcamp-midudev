describe('Note app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('frontpage can be opened', () => {
    cy.contains('Notes')
  })

  it('login form can be opened', () => {
    cy.contains('show log in').click()
  })

  it('login form can be opened and user can be logged', () => {
    cy.contains('show log in').click()
    cy.get('[placeholder="username"]').type('midudev')
    cy.get('[placeholder="password"]').type('123')
    cy.get('#form-login-button').click()
    cy.contains('show me')
  })
})
