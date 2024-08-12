import bcrypt from "bcrypt";

const password = "Password@123";

const NO_OF_ROUNDS = 10;
const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
const hashed_password = await bcrypt.hash(password, salt);
// console.log(salt);
console.log(hashed_password);
