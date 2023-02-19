import neatCsv = require('neat-csv');
import { Config } from '../../support/config';

describe('Create customer', () => {
  beforeEach(() => {
    cy.dbClear();
  });

  it('CeateCustomer_Success_CorrectRequest', () => {
    //excute database
    cy.readFile('cypress/fixtures/auth/mock-user-init-data.sql').as('mockUserScript');

    cy.get('@mockUserScript').then((script: any) => {
      cy.dbExecute(script as string);
    });

    cy.sessionLogin('admin', '1234').as('token');

    cy.get('@token').then(token => {
      cy.readFile('cypress/fixtures/customer/edit/success-case-data.csv')
        .then(neatCsv)
        .each((row: any) => {
          const data = row;

          const reqBody = JSON.parse(String(data.reqBody));
          const expectStatus = Number(data.expectStatus);

          cy.request({
            method: 'POST',
            auth: {
              bearer: token,
            },
            url: `${Config.BASE_API_URL}/api/v1/customer`,
            failOnStatusCode: false,
            body: reqBody,
          })
            .then(res => {
              expect(res.status).equal(expectStatus);

              return res.body.data.id;
            })
            .as('savedId');

          // check response
          cy.get('@savedId').then(id => {
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
  });

  it('CeateCustomer_Fail_WrongRequest', () => {
    //excute database
    cy.readFile('cypress/fixtures/auth/mock-user-init-data.sql').as('mockUserScript');

    cy.get('@mockUserScript').then((script: any) => {
      cy.dbExecute(script as string);
    });

    cy.sessionLogin('admin', '1234').as('token');

    cy.get('@token').then(token => {
      cy.readFile('cypress/fixtures/customer/create/fail-case-data.csv')
        .then(neatCsv)
        .each((row: any) => {
          const data = row;

          const reqBody = JSON.parse(String(data.reqBody));
          const expectStatus = Number(data.expectStatus);

          cy.request({
            method: 'POST',
            auth: {
              bearer: token,
            },
            url: `${Config.BASE_API_URL}/api/v1/customer`,
            failOnStatusCode: false,
            body: reqBody,
          }).then(res => {
            expect(res.status).equal(expectStatus);
          });
        });
    });
  });
});
