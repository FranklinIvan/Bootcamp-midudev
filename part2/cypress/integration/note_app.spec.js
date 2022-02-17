describe('Note app', () => {
  beforeEach(() => {
    const webSite = 'http://localhost:3000'
    const api = 'http://localhost:3001'

    cy.visit(webSite)
    cy.request('POST', `${api}/api/testing/reset`)

    const user = {
      name: 'midu',
      username: 'midudev',
      password: '123'
    }

    cy.request('POST', `${api}/api/users`, user)
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
    cy.contains('create a note')
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
