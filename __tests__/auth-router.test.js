'use strict'

process.env.SECRET = 'cool';

const { server } = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');
const supertest = require('supertest');
const bearer = require('../src/auth/middleware/bearer.js');

const Users = require('../src/auth/models/users.js');
const { response } = require('express');

const mockRequest = supergoose(server);

let users = [
  { username: 'admin', password: '1234', role: 'admin'},
  { username: 'editor', password: '1234', role: 'editor'},
  { username: 'user', password: '1234', role: 'user'}
]

describe('WEB SERVER', () => {
  it ('should respond with a 404 on not found', async() => {
    return mockRequest.get('/wrong-route').then(data => {
      expect(data.status).toBe(404)
    })
  })

  it('should respond with 500 to handle errors', async() => {
    const res = await mockRequest.get('/bad')
    console.log(res.body.route)
  })
});

describe('AUTH Routes', () => {
  it('can sign up a new user', async() => {
    const res = await mockRequest.post('/signup').send(users[2])
    const userObj = res.body;
    expect(res.status).toBe(201);
    expect(userObj.token).toBeDefined();
    expect(userObj.user.role).toEqual('user')
  })

  it('can sign in the user with bearer and ACL authentification', async() => {
    const signup = await mockRequest.post('/signup').send(users[0])
    const res = await mockRequest.post('/signin')
      .auth(users[0].username, users[0].password)

    const token = res.body.token;

    const bearerRes = await mockRequest
      .get('/users')
      .set('Authorization', `Bearer ${token}`)

    expect(bearerRes.status).toBe(200)
  })

  it('should fail sign in with wrong password', async() => {
    const signup = await mockRequest.post('/signup').send(users[1]);
    const res = await mockRequest.post('/signin')
      .auth('editor', '1111')

    expect(res.status).toBe(403);
    expect(res.body.user).not.toBeDefined()
  });

  it('should fail sign in with unknown user', async() => {
    const res = await mockRequest.post('/signin')
      .auth('unknownUser', '1234')

    expect(res.status).toBe(403);
    expect(res.body.user).not.toBeDefined();
  })
})