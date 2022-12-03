'use strict';

const users = [
  { id: 1, name: 'John', lastName: 'Does', age: 20 },
  { id: 2, name: 'jane', lastName: 'Does', age: 22 },
  { id: 3, name: 'Carlos', lastName: 'Bremer', age: 58 },
  { id: 4, name: 'Rodrigo', lastName: 'Herrera', age: 49 },
];

module.exports.getUsers = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ users, input: event }, null, 2),
  };
};

module.exports.getUser = async (event) => {
  const id = Number(event.pathParameters.id) ?? 0;

  const user = users.find(userItem => userItem.id === id);

  if (user) {
    return {
      statusCode: 200,
      body: JSON.stringify({ user, input: event }, null, 2),
    };
  }

  return {
    statusCode: 404,
    body: JSON.stringify({ message: 'No se encontro el usuario', input: event }, null, 2)
  };
};

module.exports.createUser = async (event) => {
  const body = JSON.parse(event.body);

  const user = {
    id: users.length + 1,
    name: body.name,
    lastName: body.lastName,
    age: body.age,
  };

  users.push(user);

  return {
    statusCode: 201,
    body: JSON.stringify({ user, input: event })
  };
};