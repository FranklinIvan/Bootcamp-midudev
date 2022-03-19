const webSite = 'http://localhost:3000'
const api = 'http://localhost:3001/api'

describe('Note app', () => {
  beforeEach(() => {

    cy.visit(webSite)
    cy.request('POST', `${api}/testing/reset`)

    const user = {
      name: 'midu',
      username: 'midudev',
      password: '123'
    }

    cy.request('POST', `${api}/users`, user)
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

  it('login fails w/ wrong credentials', () => {
    cy.contains('show log in').click()
    cy.get('[placeholder="username"]').type('midudev')
    cy.get('[placeholder="password"]').last().type('xd')
    cy.get('#form-login-button').click()
    cy.contains('wrong credentials')
  })

  describe('when a user logged in', () => {
    beforeEach(() => {
      cy.login({username: 'midudev', password: '123'})
    })

    it('a new note can be created', () => {
      const contentNote = 'a new note created by cypress testing'
      cy.contains('create a note').click()
      cy.get('[placeholder="write your new note"]').type(contentNote)
      cy.contains('save').click()
      cy.contains(contentNote)
    })

    describe.only('and a note exists', () => {
      beforeEach(() => {
        cy.createNote({
          content: 'a note created from cypress',
          important: false
        })
        cy.createNote({
          content: 'a note created from cypress, but this is the second',
          important: false
        })
      })

      it('can be made important', () => {
        cy
          .contains('a note created from cypress')
          .contains('make important').click()

        cy.contains('a note created from cypress')
          .contains('make not important')
      })
    })

  })
})
