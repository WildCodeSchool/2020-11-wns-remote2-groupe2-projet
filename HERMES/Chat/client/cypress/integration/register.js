describe('User Register page', () => {

    const userInfo = {
        email: "azerty" + (Math.floor(Math.random() * 1000)) + '@wcs.fr',
        username: "user" + (Math.floor(Math.random() * 1000)),
        campus: "Remote-FR",
        role: "Developpeur",
        password: "s3cr3t",
    }

    it("Allow a visitor to register", function () {


        cy.visit('/register')

        // Register
        cy.get('div.css-0').should("contain", "Inscription")
        cy.get('input[type=email]').type(userInfo.email)
        cy.get('input[type=name]').type(userInfo.username)
        cy.get('select[type=campus]').select(userInfo.campus)
        cy.get('select[type=role]').select(userInfo.role)
        cy.get('input[type=password]').first().type(userInfo.password)
        cy.get('input[type=password]').last().type(userInfo.password)
        cy.get('button[type=submit]').click()
        cy.get('div.chakra-toast__inner').should('exist').contains('div.chakra-alert__title', 'Félicitation')
    
        // Redirect to /login
        cy.url().should('include', '/login')

    })
    // Login last user registered
    it('Login with previous User & Password registered', () => {
        cy.get('input').first()
        cy.contains(userInfo.username)
        cy.get('input').last().type(userInfo.password)
        cy.get('button[type=submit]').click()
    })

    //     /* TO IMPORT
    //     // Logout
    //     it('Logout user registered', () => {
    //         cy.get('div[role=button].dropdown-trigger').click()
    //         cy.get('div.has-link').children('a').click()
    //         cy.url().should('include', '/logout')
    //         cy.get('div.message-body').should("be.visible").and("contain", "Vous êtes maintenant déconnecté, à bientot")
    //     })
    // */
})