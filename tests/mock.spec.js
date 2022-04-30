const nock = require('nock');
const request = require('supertest');
const expect = require('chai').expect;

const url = 'http://localhost:4000';

// with nock the server does not to be running, nock intercepts the request
// that's what mocking it's all about
describe('Mock response', () => {
  beforeEach(() => {
    nock(url)
      .get('/users')
      .reply(200, {
        users: [{ id: '1' }],
      });
  });

  it('nock intercepts', () => {
    request(url)
      .get('/users')
      .end((err, res) => {
        expect(res.body.users[0].id).to.be.equal('1');
      });
  });
});
