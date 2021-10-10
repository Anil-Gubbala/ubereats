const { expect } = require('chai');
const request = require('request');
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('assert').strict;
const app = require('../index');

const should = chai.should();

chai.use(chaiHttp);
console.log(require('chai').request);
const agent = require('chai').request.agent(app);

// describe('Handshake Testing', () => {
//   it('GET /signin - Authenticate User with Invalid Credentials', (done) => {
//     agent
//       .post('/signin')
//       .send({ email: 'user1@email.com', customer: 'true', password: 'asdf' })
//       .then((response) => {
//         console.log(response.status);
//         agent
//           .get('/myOrders')
//           .then((response1) => {
//             done();
//             console.log(response1.status);
//           })
//           .catch((e) => {
//             done();
//           });
//         // expect(response.status).to.equal(401);
//         // expect(response.body.message).to.equal('Invalid Credentials');
//       })
//       .catch((e) => {
//         done(e);
//       });
//   });
// });

describe('/POST signin', () => {
  it('it should Signin successfully', (done) => {
    agent
      .post('/signin')
      .send({ email: 'user1@email.com', customer: 'true', password: 'asdf' })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('email');
        done();
      });
  });
});

describe('/GET orders', () => {
  it('it should retrun placed orders', (done) => {
    agent.get('/myOrders').end((err1, res1) => {
      res1.should.have.status(200);
      res1.should.be.a('object');
      done();
    });
  });
});
