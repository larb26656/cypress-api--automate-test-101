declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      dbClear: () => Chainable<Response<any>>;
      dbExecute: (script: string) => Chainable<Response<any>>;
    }
  }
}

import './custom';
