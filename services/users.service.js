import { Users } from "../entities/users.entity.js";

async function createUser(data) {
  return await Users.create(data).go();
}
async function getUserByUsername(username) {
  return await Users.get({ username: username }).go();
}

export { createUser, getUserByUsername };
