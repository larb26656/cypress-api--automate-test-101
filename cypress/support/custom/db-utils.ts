export function dbClear() {
  return cy.request({
    method: 'POST',
    url: 'http://127.0.0.1:4000/api/dev/db/clear',
  });
}

Cypress.Commands.add('dbClear', dbClear as any);

export function dbExecute(script: string) {
  return cy.request({
    method: 'POST',
    url: 'http://127.0.0.1:4000/api/dev/db/sql/execute',
    body: script,
  });
}

Cypress.Commands.add('dbExecute', dbExecute as any);
