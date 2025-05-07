/// <reference types = 'cypress'/>

describe('Pet Store API Tests For Users', () => {
    
    const baseURL = 'https://petstore.swagger.io/v2/user';

    it('POST Request - should add a new user', () => {
        cy.request({
            method: 'POST',
            url: `${baseURL}/createWithList`,
            headers: { 'Content-Type': 'application/json' },
            body: [
                {
                    id: 0,
                    username: 'Mumu',
                    firstName: 'Muhabbat',
                    lastName: 'Abduganieva',
                    email: 'abdu@gmail.com',
                    password: '123456',
                    phone: '123456',
                    userStatus: 0
                }
            ]
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('PUT Request - update user by username', () => {
        cy.request('GET', `${baseURL}/Mumu`).then((getResponse) => {
            const userID = getResponse.body.id;

            expect(getResponse.status).to.eq(200);
            expect(getResponse.body).to.have.property('username', 'Mumu');
            expect(getResponse.body).to.have.property('firstName', 'Muhabbat');

            cy.request({
                method: 'PUT',
                url: `${baseURL}/Mumu`,
                headers: { 'Content-Type': 'application/json' },
                body: {
                    id: userID,
                    username: 'MumuAbdu',
                    firstName: 'Muhabbat',
                    lastName: 'Abduganieva',
                    email: 'abdu@gmail.com',
                    password: '123456',
                    phone: '123456',
                    userStatus: 0
                }
            }).then((putResponse) => {
                expect(putResponse.status).to.eq(200);
                expect(putResponse.body).to.have.property('message', String(userID));
            });
        });
    });

    it('GET Request - user not found after username change', () => {
        cy.request({
            method: 'GET',
            url: `${baseURL}/Mumu`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body).to.have.property('message', 'User not found');
        });
    });

    it('GET Request - gets updated user', () => {
        cy.request('GET', `${baseURL}/MumuAbdu`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('username', 'MumuAbdu');
        });
    });
});

