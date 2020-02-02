/* eslint-disable */

import { userAPI, recommendationAPI } from '../../src/utils/httpService';

describe('Get Insurance Recommendation', () => {
  before(() => {
    cy.server();

    // Send User Data Route Aliasing
    cy.route({
      method: 'POST',
      url: userAPI,
      onResponse: ({ status }) => {
        // Check if request has succeeded (status is in the 200s range)
        expect(Number(status.toString()[0])).to.equal(2);
      },
    }).as('sendUserData');

    // Send User Data Route Aliasing
    cy.route({
      method: 'GET',
      url: recommendationAPI,
      onResponse: ({ status }) => {
        // Check if request has succeeded (status is in the 200s range)
        expect(Number(status.toString()[0])).to.equal(2);
      },
    }).as('getRecommendation');
  });

  beforeEach(()=>{
    cy.visit('/');
  })

  it('Should successfully get recommendation if user data is correct', () => {
    cy.get('[data-test="firstName-input"]').type('Kevin');
    cy.get('[data-test="action-button"]').click();
    cy.get('[data-test="address-input"]').type('1 Happiness St.');
    cy.get('[data-test="action-button"]').click();
    cy.get('[data-test="occupation-input-EMPLOYED"]').click();
    cy.get('[data-test="action-button"]').click();
    cy.get('[data-test="childrenPossession-input-true"]').click();
    cy.get('[data-test="action-button"]').click();
    cy.get('[data-test="numberOfChildren-input"]').type(2);
    cy.get('[data-test="action-button"]').click();
    cy.get('[data-test="email-input"]').type('kevin@email.com');
    cy.get('[data-test="action-button"]').click();

    // Assertions are included in the routes
    cy.wait('@sendUserData');
    cy.wait('@getRecommendation');

    cy.wait(2000);
  });

  it('Should prevent user from submitting if the email entered has an incorrect format', () => {
    cy.get('[data-test="firstName-input"]').type('Kevin');
    cy.get('[data-test="action-button"]').click();
    cy.get('[data-test="address-input"]').type('1 Happiness St.');
    cy.get('[data-test="action-button"]').click();
    cy.get('[data-test="occupation-input-EMPLOYED"]').click();
    cy.get('[data-test="action-button"]').click();
    cy.get('[data-test="childrenPossession-input-true"]').click();
    cy.get('[data-test="action-button"]').click();
    cy.get('[data-test="numberOfChildren-input"]').type(2);
    cy.get('[data-test="action-button"]').click();
    cy.get('[data-test="email-input"]').type('kevin.com');

    cy.get('[data-test="action-button"]')
          .invoke('attr', 'disabled')
          .then($value => {
            console.log($value);
            expect($value).to.equal("disabled");
          });

    cy.wait(2000);
  });
});
