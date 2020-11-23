const app = require("../server");
const supertest = require("supertest");
 
const request = supertest(app);
  
test("fetch checkins and insights", async (done) => {
 
  request
    .post("/graphql")
    .send({
      query: "{ getUserCheckIns{ id, moodScore} }",
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.body).toBeInstanceOf(Object);
      
      done();
    });

    request
    .post("/graphql")
    .send({
      query: "{ getInsights{ averagePercentage, moodScore} }",
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.body).toBeInstanceOf(Object);
      done();
    });
});