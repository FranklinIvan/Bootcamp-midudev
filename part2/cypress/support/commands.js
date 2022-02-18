const webSite = 'http://localhost:3000'
const api = 'http://localhost:3001/api'

Cypress.Commands.add('login', ({username, password}) => {
    cy.request('POST', `${api}/login`, {
        username,
        password
      }).then(response => {
        window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(response.body))
        cy.visit(webSite)
      })
})

Cypress.Commands.add('createNote', ({content, important = false}) => {
    cy.request({
        method: 'POST',
        url: `${api}/notes`,
        body: {content, important},
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('loggedNoteAppUser')).token}`
        }
    })
    cy.visit(webSite)
})