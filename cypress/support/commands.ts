declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      dbClear: () => Chainable<Response<any>>;
      dbExecute: (script: string) => Chainable<Response<any>>;
      sessionLogin: (username: string, password: string) => Chainable<string>;
    }
  }
}

import './custom';
