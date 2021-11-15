const { expect } = require("chai");
const request = require("request");
const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = require("assert").strict;
const app = require("../index");

const should = chai.should();

chai.use(chaiHttp);
console.log(require("chai").request);
const agent = require("chai").request.agent(app);

const token =
  "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsImlzQ3VzdG9tZXIiOnRydWUsInN0YXR1cyI6MSwiaWF0IjoxNjM2OTE3MTg0LCJleHAiOjE2Mzc5MjUxODR9.0_ufNQEryBfoumK3VkdrwLxJGCcW7TUV1rSTm-XQPeU";

describe("/POST signin", () => {
  it("it should Signin successfully", (done) => {
    agent
      .post("/signin")
      .send({
        email: "user1@gmail.com",
        customer: true,
        password: "asdfasdf",
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a("object");
        res.body.should.have.property("token");
        done();
      });
  });
});

describe("/GET orders", () => {
  it("it should retrun placed orders", (done) => {
    agent
      .get("/myOrders")
      .set({ Authorization: `${token}` })
      .end((err1, res1) => {
        res1.should.have.status(200);
        res1.should.be.a("object");
        done();
      });
  });
});

describe("/GET user data", () => {
  it("it should retrun user details", (done) => {
    agent
      .get("/getUserProfile")
      .set({ Authorization: `${token}` })
      .end((err1, res1) => {
        res1.should.have.status(200);
        res1.should.be.a("object");
        done();
      });
  });
});

describe("/GET restaurant list", () => {
  it("it should retrun restaurant list", (done) => {
    agent
      .get("/getUserProfile")
      .set({ Authorization: `${token}` })
      .end((err1, res1) => {
        res1.should.have.status(200);
        res1.should.be.a("object");
        done();
      });
  });
});

describe("/GET cart items", () => {
  it("it should retrun items in the cart", (done) => {
    agent
      .get("/getCart")
      .set({ Authorization: `${token}` })
      .end((err1, res1) => {
        res1.should.have.status(200);
        res1.should.be.a("object");
        done();
      });
  });
});
