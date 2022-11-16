const users = [];

const addUser = (id, name, room) => {
  const user = { id, name, room };
  users.push(user);
  console.log(users);
  return user;
};

const removeUser = (id) => {
  const user = users.findIndex((u) => u.id == id);
  if (user !== -1) {
    return users.splice(user, 1);
  }
};

const getUser = (id) => {
  console.log(users);
  return users.find((u) => u.id == id);
};

const getUsersInRoom = ({ room }) => {
  return users.filter((u) => u.room == room);
};

console.log(users);

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};
