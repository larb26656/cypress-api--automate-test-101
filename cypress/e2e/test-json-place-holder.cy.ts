describe('Test json place holder', () => {
  it('todoAPI_Success_CorrectUrlAndRequest', () => {
    cy.request({
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/todos/1',
    }).then(res => {
      expect(res.status).equal(200);
    });
  });
});
