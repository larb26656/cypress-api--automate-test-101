import neatCsv = require('neat-csv');
import { Config } from '../../support/config';

describe('Read customer', () => {
  beforeEach(() => {
    cy.dbClear();
  });

  it('GetCustomerById_Success_IdInDB', () => {
    //excute database
    cy.readFile('cypress/fixtures/auth/mock-user-init-data.sql').as('mockUserScript');

    cy.get('@mockUserScript').then((script: any) => {
      cy.dbExecute(script as string);
    });

    cy.readFile('cypress/fixtures/customer/get/mock-customer-init-data.sql').as('mockCustomerScript');

    cy.get('@mockCustomerScript').then((script: any) => {
      cy.dbExecute(script as string);
    });

    cy.sessionLogin('admin', '1234').as('token');

    cy.get('@token').then(token => {
      cy.request({
        method: 'GET',
        auth: {
          bearer: token,
        },
        url: `${Config.BASE_API_URL}/api/v1/customer/1`,
      }).then(res => {
        const resData = res.body.data;

        const name = 'test';
        const email = 'admin@test.com';

        expect(resData.name).equal(name);
        expect(resData.email).equal(email);
      });
    });
  });

  it('GetCustomerById_Fail_IdNotInDB', () => {
    //excute database
    cy.readFile('cypress/fixtures/auth/mock-user-init-data.sql').as('mockUserScript');

    cy.get('@mockUserScript').then((script: any) => {
      cy.dbExecute(script as string);
    });

    cy.sessionLogin('admin', '1234').as('token');

    cy.get('@token').then(token => {
      cy.request({
        method: 'GET',
        auth: {
          bearer: token,
        },
        failOnStatusCode: false,
        url: `${Config.BASE_API_URL}/api/v1/customer/1`,
      }).then(res => {
        expect(res.status).equal(400);
        expect(res.body.data).equal(undefined);
      });
    });
  });

  it('GetCustomer_SuccessAndGetData_HaveDataInDB', () => {
    //excute database
    cy.readFile('cypress/fixtures/auth/mock-user-init-data.sql').as('mockUserScript');

    cy.get('@mockUserScript').then((script: any) => {
      cy.dbExecute(script as string);
    });

    cy.readFile('cypress/fixtures/customer/get/mock-customer-init-data.sql').as('mockCustomerScript');

    cy.get('@mockCustomerScript').then((script: any) => {
      cy.dbExecute(script as string);
    });

    cy.sessionLogin('admin', '1234').as('token');

    cy.get('@token').then(token => {
      cy.request({
        method: 'GET',
        auth: {
          bearer: token,
        },
        url: `${Config.BASE_API_URL}/api/v1/customer`,
      }).then(res => {
        const resData = res.body.data;

        expect(resData.length).equal(2);
      });
    });
  });

  it('GetCustomer_SuccessAndGetEmptyData_HaveNotDataInDB', () => {
    //excute database
    cy.readFile('cypress/fixtures/auth/mock-user-init-data.sql').as('mockUserScript');

    cy.get('@mockUserScript').then((script: any) => {
      cy.dbExecute(script as string);
    });

    cy.sessionLogin('admin', '1234').as('token');

    cy.get('@token').then(token => {
      cy.request({
        method: 'GET',
        auth: {
          bearer: token,
        },
        url: `${Config.BASE_API_URL}/api/v1/customer`,
      }).then(res => {
        const resData = res.body.data;

        expect(resData.length).equal(0);
      });
    });
  });
});
