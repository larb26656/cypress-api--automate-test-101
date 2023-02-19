import neatCsv = require('neat-csv');
import { Config } from '../../support/config';

describe('Delete customer', () => {
  beforeEach(() => {
    cy.dbClear();
  });

  it('DeleteCustomerById_Success_IdInDB', () => {
    //excute database
    cy.readFile('cypress/fixtures/auth/mock-user-init-data.sql').as('mockUserScript');

    cy.get('@mockUserScript').then((script: any) => {
      cy.dbExecute(script as string);
    });

    cy.readFile('cypress/fixtures/customer/delete/mock-customer-init-data.sql').as('mockCustomerScript');

    cy.get('@mockCustomerScript').then((script: any) => {
      cy.dbExecute(script as string);
    });

    cy.sessionLogin('admin', '1234').as('token');

    cy.get('@token').then(token => {
      cy.request({
        method: 'DELETE',
        auth: {
          bearer: token,
        },
        url: `${Config.BASE_API_URL}/api/v1/customer/1`,
      });

      cy.request({
        method: 'GET',
        auth: {
          bearer: token,
        },
        failOnStatusCode: false,
        url: `${Config.BASE_API_URL}/api/v1/customer/1`,
      }).then(res => {
        expect(res.status).equal(400);
      });
    });
  });

  it('DeleteCustomerById_Fail_IdNotInDB', () => {
    //excute database
    cy.readFile('cypress/fixtures/auth/mock-user-init-data.sql').as('mockUserScript');

    cy.get('@mockUserScript').then((script: any) => {
      cy.dbExecute(script as string);
    });

    cy.sessionLogin('admin', '1234').as('token');

    cy.get('@token').then(token => {
      cy.request({
        method: 'DELETE',
        auth: {
          bearer: token,
        },
        failOnStatusCode: false,
        url: `${Config.BASE_API_URL}/api/v1/customer/1`,
      }).then(res => {
        const resBody = res.body;

        expect(res.status).equal(400);
        expect(resBody.code).equal('CUSTOMER_01');
      });
    });
  });
});
