const request = require('supertest');
const express = require('express');

const app = express();



app.get('/geonamesData', function(req, res) {
          res.status(200).json({ name: 'john' });
        });
        

describe('GET /geonamesData', function() {
          it('responds with json', function(done) {
            request(app)
              .get('/geonamesData')
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .expect(200, done);
          });
  });




