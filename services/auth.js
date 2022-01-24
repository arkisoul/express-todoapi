const { compare, hash, genSalt } = require("bcrypt")

const { UserNotFoundError, InvalidRequestError, EmailAlreadyRegisteredError } = require("../helpers");
const { UsersModel } = require("../models");

class AuthService {
  login = async ({ email, password }) => {
    const user = await UsersModel.findOne({ email: email });

    if (!user) throw new UserNotFoundError();

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new InvalidRequestError();

    return user;
  };

  register = async ({ name, email, password }) => {
    const userExists = await UsersModel.findOne({ email });

    if (userExists) throw new EmailAlreadyRegisteredError();

    const salt = await genSalt()

    const hasedPassword = await hash(password, salt);

    const user = await UsersModel.create({
      name,
      email,
      password: hasedPassword,
    });

    return user;
  };
}

module.exports = new AuthService();