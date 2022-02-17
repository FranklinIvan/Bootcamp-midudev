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

  it('login form can be opened and user can be logged in', () => {
    cy.contains('show log in').click()
    cy.get('[placeholder="username"]').type('midudev')
    cy.get('[placeholder="password"]').last().type('123')
    cy.get('#form-login-button').click()
    cy.contains('create a note').click()
  })

  describe('when a user logged in', () => {
    beforeEach(() => {
      cy.contains('show log in').click()
      cy.get('[placeholder="username"]').type('midudev')
      cy.get('[placeholder="password"]').last().type('123')
      cy.get('#form-login-button').click()
      cy.contains('create a note').click()
    })
    it('a new note can be created', () => {
      const contentNote = 'a new note created from cypress testing'
      cy.get('[placeholder="write your new note"]').type(contentNote)
      cy.contains('save').click()
      cy.contains(contentNote)
    })
  })
})
