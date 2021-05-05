describe('User Login page', () => {
    
    it('Wrong user', () => {
        cy.visit('/login')
        cy.get('input').first().type('compte bidon')
        cy.get('input').last().type('123')
        cy.get('button[type=submit]').click()
        cy.get('div.chakra-form-control > p').should('contain', 'Nom d\'utilisateur inconnu')
    })
    it('Wrong Password', () => {
        cy.visit('/login')
        cy.get('input').first().type('vic')
        cy.get('input').last().type('123')
        cy.get('button[type=submit]').click()
        cy.get('div.chakra-form-control > p').should('contain', 'Mot de passe incorrect')
    })
    it('With User & Password registered', () => {
        cy.visit('/login')
        cy.get('input').first().type('vic')
        cy.get('input').last().type('azerty')
        cy.get('button[type=submit]').click()
    })
})