"use strict";

const supertest = require("supertest");
const test = require("unit.js");
const app = require("../dist/app.js");

const request = supertest(app);

describe("Tests app", function () {
  it("verifies get", function (done) {
    request
      .get("/")
      .expect(200)
      .end(function (err, result) {
        test.string(result.body.Output).contains("Choikt Labs Api");
        test
          .value(result)
          .hasHeader("content-type", "application/json; charset=utf-8");
        done(err);
      });
  });
});
