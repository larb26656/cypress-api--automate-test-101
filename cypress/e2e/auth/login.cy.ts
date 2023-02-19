describe('Login', () => {
  it('Login_Success_CorrectUsernameAndPassword', () => {
    // clear database
    cy.dbClear().then(res => {
      expect(res.status).equal(200);
    });

    //excute database
    const initUserScript =
      "INSERT INTO `user` (name,username,`password`, active, deleted) VALUES('user1', 'admin', '81dc9bdb52d04dc20036dbd8313ed055',1,0);";

    cy.dbExecute(initUserScript).then(res => {
      expect(res.status).equal(200);
    });

    cy.request({
      method: 'POST',
      url: 'http://127.0.0.1:4000/auth/login',
      failOnStatusCode: false,
      body: {
        username: 'admin',
        password: '1234',
      },
    }).then(res => {
      expect(res.status).equal(200);
    });
  });
});
