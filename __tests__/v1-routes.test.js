'use strict'

const { server } = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');

const mockRequest = supergoose(server);

let toDoList = [
  {text: 'clean the room', assignee: 'john', complete: 'false', difficulty: '2'},
  {text: 'take a break', assignee: 'bob', complete: 'true', difficulty: '5'},
  {text: 'grocery shopping', assignee: 'jane', complete: 'false', difficulty: '2'},
  {text: 'go to the gym', assignee: 'steven', complete: 'true', difficulty: '1'}
]

describe('v1 server routes', () => {
  it('can create a new item', async () => {
    const res = await mockRequest.post('/api/v1/todo').send(toDoList[0])

    expect(res.status).toBe(201);
    expect(res.body._id).toBeDefined();
  });

  it('can read one item from database', async () => {
    const newItem = await mockRequest.post('/api/v1/todo').send(toDoList[1]);
    const id = newItem.body._id;
    const res = await mockRequest.get(`/api/v1/todo/${id}`)

    expect(res.status).toBe(200);
    expect(res.body.text).toEqual(newItem.body.text)
  });

  it('can read all items from database', async () => {
    const res = await mockRequest.get('/api/v1/todo');

    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(2);

  });

  it('can update an item in database', async () => {
    const itemToUpdate = await mockRequest.post('/api/v1/todo').send(toDoList[2])
    const newItem = {text: "pharmacy shopping", assignee: 'nick'}
    const id = itemToUpdate.body._id;

    const res = await mockRequest.put(`/api/v1/todo/${id}`).send(newItem);

    expect(res.status).toBe(200);
    expect(res.body.text).toEqual(newItem.text);
  });

  it('can delete an item from database', async () => {
    const allItems = await mockRequest.get('/api/v1/todo')
    expect(allItems.body.length).toEqual(3);
    const id = allItems.body[0]._id;
    const res = await mockRequest.delete(`/api/v1/todo/${id}`);
    expect(res.status).toBe(200)
  })
})