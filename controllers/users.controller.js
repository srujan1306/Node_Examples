import { createUser } from "../services/users.service.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const genHashPassword = async (password) => {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashed_password = await bcrypt.hash(password, salt);
  return hashed_password;
  // console.log(salt);
  // console.log(hashed_password);
};

async function createUserCtr(request, response) {
  const data = request.body;
  data.userId = uuidv4();
  const hashedPassword = await genHashPassword(data.password);
  try {
    const addUser = await createUser({
      username: data.username,
      password: hashedPassword,
      firstname: data.firstname,
      lastname: data.lastname,
      userId: data.userId,
    });
    response
      .status(201)
      .send({ msg: `${data.username} signed up successfully` });
  } catch (error) {
    response.status(500).send({ msg: "failed to signup" });
  }
}

export { createUserCtr };
