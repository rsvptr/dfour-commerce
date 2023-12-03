// import request from "supertest";
// import app from "../server";

// async function main() {
//   /* using 20 to make the progress bar length 20 charactes, multiplying by 5 below to arrive to 100 */

//   for (let i = 0; i <= 20; i++) {
//     const dots = ".".repeat(i);
//     const left = 20 - i;
//     const empty = " ".repeat(left);

//     /* need to use  `process.stdout.write` becuase console.log print a newline character */
//     /* \r clear the current line and then print the other characters making it looks like it refresh*/
//     process.stdout.write(`\r[${dots}${empty}] ${i * 5}%`);
//     await wait(80);
//   }
// }

// // main();

// function wait(ms) {
//   return new Promise((res) => setTimeout(res, ms));
// }

// describe("Authentication User", function () {
//   it("should login user", function (done) {
//     setTimeout(() => {
//       done();
//     }, Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000);
//   });

//   it("Should fetch users", function (done) {
//     setTimeout(() => {
//       done();
//     }, Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000);
//   });
// });

// describe("Authentication Posts", function () {
//   it("Should fetch authenticated user on providing auth token", function (done) {
//     setTimeout(() => {
//       done();
//     }, Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000);
//   });

//   it("Should return invalid token", function (done) {
//     setTimeout(() => {
//       done();
//     }, Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000);
//   });
// });

// describe("Comment tests", function () {
//   it("should fetch all comments to a post", function (done) {
//     setTimeout(() => {
//       done();
//     }, Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000);
//   });

//   it("should give invalid credentials", function (done) {
//     setTimeout(() => {
//       done();
//     }, Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000);
//   });
// });

import request from "supertest";
// const request = require("supertest");
import app from "../server.js";

describe("Products API", function () {
  it("Should fetch all the products", function (done) {
    request(app)
      .get("/api/products")
      .expect("content-type", /json/)
      .expect(200, done);

    done();
  });

  // it("Should return invalid token", function (done) {
  //   request(app)
  //     .get("/api/auth")
  //     .set(
  //       "Authorization",
  //       "eyJbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkYWY3ODJjNjg2YmYzNGE4YWNlNTJlIn0sImlhdCI6MTY1MDg3ODQ3NCwiZXhwIjoxNjUwODgyMDc0fQ.jxdajBgZlRGiIEoG7D1hbmTtmwLFkoCsP4hp4gko3eY"
  //     )
  //     .expect("content-type", /json/)
  //     .expect(401, done);
  // });
});
