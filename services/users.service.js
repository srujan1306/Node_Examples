import { Users } from "../entities/users.entity.js";

async function createUser(data) {
  return await Users.create(data).go();
}

export { createUser };
