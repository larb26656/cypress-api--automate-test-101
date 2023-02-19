import { Config } from '../config';

export function dbClear() {
  return cy.request({
    method: 'POST',
    url: `${Config.BASE_API_URL}/api/dev/db/clear`,
  });
}

Cypress.Commands.add('dbClear', dbClear as any);

export function dbExecute(script: string) {
  return cy.request({
    method: 'POST',
    url: `${Config.BASE_API_URL}/api/dev/db/sql/execute`,
    body: script,
  });
}

Cypress.Commands.add('dbExecute', dbExecute as any);
