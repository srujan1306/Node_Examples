import { createUser, getUserByUsername } from "../services/users.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

async function loginUserCtr(request, response) {
  const data = request.body;
  const userFromDB = await getUserByUsername(data.username);
  if (!userFromDB.data) {
    response.status(400).send({ msg: `invalid credentials` });
  } else {
    const storedDBPassword = userFromDB.data.password;
    const providedPassword = data.password;
    const isPasswordCheck = await bcrypt.compare(
      providedPassword,
      storedDBPassword
    );
    console.log({ providedPassword, storedDBPassword });
    console.log(isPasswordCheck);
    if (isPasswordCheck) {
      var token = jwt.sign(
        {
          srujan: userFromDB.data.username,
        },
        process.env.SECRET_KEY
      );
      console.log(token);

      response.status(200).send({ msg: `login successful`, token });
    } else {
      response.status(400).send({ msg: `invalid credentials` });
    }
  }
}

export { createUserCtr, loginUserCtr };
