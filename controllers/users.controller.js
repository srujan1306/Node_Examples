import { createUser, getUserByUsername } from "../services/users.service.js";
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

  const userFromDB = await getUserByUsername(data.username);
  console.log(userFromDB);
  if (!userFromDB.data) {
    const hashedPassword = await genHashPassword(data.password);
    try {
      await createUser({
        username: data.username,
        password: hashedPassword,
      });
      response
        .status(201)
        .send({ msg: `${data.username} signed up successfully` });
    } catch (error) {
      response.status(500).send({ msg: "failed to signup" });
    }
  } else {
    response.status(500).send({ msg: "username already taken" });
  }
}

export { createUserCtr };
