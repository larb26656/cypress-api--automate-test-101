import neatCsv = require('neat-csv');
import { Config } from '../../support/config';
import { StringUtils } from '../../support/custom/string-utils';

describe('Edit customer', () => {
  beforeEach(() => {
    cy.dbClear();
  });

  it('EditCustomerById_Success_CorrectReq', () => {
    //excute database
    cy.readFile('cypress/fixtures/auth/mock-user-init-data.sql').as('mockUserScript');

    cy.get('@mockUserScript').then((script: any) => {
      cy.dbExecute(script as string);
    });

    cy.readFile('cypress/fixtures/customer/edit/mock-customer-init-data.sql').as('mockCustomerScript');

    cy.get('@mockCustomerScript').then((script: any) => {
      cy.dbExecute(script as string);
    });

    cy.sessionLogin('admin', '1234').as('token');

    cy.get('@token').then(token => {
      cy.readFile('cypress/fixtures/customer/edit/success-case-data.csv')
        .then(neatCsv)
        .each((row: any) => {
          const data = row;

          const id = Number(data.id);
          const reqBody = JSON.parse(String(data.reqBody));
          const expectStatus = Number(data.expectStatus);
          const resCode = String(data.resCode);

          cy.request({
            method: 'PUT',
            auth: {
              bearer: token,
            },
            url: `${Config.BASE_API_URL}/api/v1/customer/${id}`,
            failOnStatusCode: false,
            body: reqBody,
          }).then(res => {
            expect(res.status).equal(expectStatus);

            const resBody = res.body;

            expect(StringUtils.compareAllEmpty(resBody.code, resCode)).to.be.true;
          });

          // check response
          cy.request({
            method: 'GET',
            auth: {
              bearer: token,
            },
            url: `${Config.BASE_API_URL}/api/v1/customer/${id}`,
          }).then(res => {
            const resData = res.body.data;

            const name = reqBody.name;
            const email = reqBody.email;

            expect(resData.name).equal(name);
            expect(resData.email).equal(email);
          });
        });
    });
  });

  it('EditCustomerById_Fail_WrongReq', () => {
    //excute database
    cy.readFile('cypress/fixtures/auth/mock-user-init-data.sql').as('mockUserScript');

    cy.get('@mockUserScript').then((script: any) => {
      cy.dbExecute(script as string);
    });

    cy.readFile('cypress/fixtures/customer/edit/mock-customer-init-data.sql').as('mockCustomerScript');

    cy.get('@mockCustomerScript').then((script: any) => {
      cy.dbExecute(script as string);
    });

    cy.sessionLogin('admin', '1234').as('token');

    cy.get('@token').then(token => {
      cy.readFile('cypress/fixtures/customer/edit/fail-case-data.csv')
        .then(neatCsv)
        .each((row: any) => {
          const data = row;

          const id = Number(data.id);
          const reqBody = JSON.parse(String(data.reqBody));
          const expectStatus = Number(data.expectStatus);
          const resCode = String(data.resCode);

          cy.request({
            method: 'PUT',
            auth: {
              bearer: token,
            },
            url: `${Config.BASE_API_URL}/api/v1/customer/${id}`,
            failOnStatusCode: false,
            body: reqBody,
          }).then(res => {
            expect(res.status).equal(expectStatus);

            const resBody = res.body;

            expect(StringUtils.compareAllEmpty(resBody.code, resCode)).to.be.true;
          });
        });
    });
  });
});
