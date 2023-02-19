import neatCsv = require('neat-csv');
import { Config } from '../../support/config';

describe('Login', () => {
  before(() => {
    cy.log('before func invoked');
  });

  beforeEach(() => {
    cy.log('before each func invoked');

    // clear database
    cy.dbClear();
  });

  afterEach(() => {
    cy.log('after each func invoked');
  });

  after(() => {
    cy.log('after func invoked');
  });

  it('Login_Success_CorrectUsernameAndPassword', () => {
    //excute database
    cy.readFile('cypress/fixtures/auth/login/success-case-init-data.sql').as('initScript');

    cy.get('@initScript').then((script: any) => {
      cy.dbExecute(script as string);
    });

    cy.readFile('cypress/fixtures/auth/login/success-case-data.csv')
      .then(neatCsv)
      .each((row: any) => {
        const data = row;

        const reqBody = String(data.reqBody);
        const expectStatus = Number(data.expectStatus);

        cy.request({
          method: 'POST',
          url: `${Config.BASE_API_URL}/auth/login`,
          failOnStatusCode: false,
          body: JSON.parse(reqBody),
        }).then(res => {
          expect(res.status).equal(expectStatus);
        });
      });
  });

  it('Login_Fail_InvalidParameterOrInvalidUsernameOrPassword', () => {
    cy.readFile('cypress/fixtures/auth/login/fail-case-data.csv')
      .then(neatCsv)
      .each((row: any) => {
        const data = row;

        const reqBody = String(data.reqBody);
        const expectStatus = Number(data.expectStatus);

        cy.request({
          method: 'POST',
          url: `${Config.BASE_API_URL}/auth/login`,
          failOnStatusCode: false,
          body: JSON.parse(reqBody),
        }).then(res => {
          expect(res.status).equal(expectStatus);
        });
      });
  });
});
