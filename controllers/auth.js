const jwt = require("jsonwebtoken");

const { authService } = require("../services");
const { InvalidRequestError } = require("../helpers");

class AuthController {
  constructor() {
    this.authService = authService;
  }

  login = async (req, res) => {
    try {
      const user = await this.authService.login(req.body);

      const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY);

      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env === "production",
        })
        .status(200)
        .json({
          success: true,
          message: "Login successful",
          data: user,
          error: null,
          resource: req.originalUrl,
        });
    } catch (error) {
      return res.status(error.code ? error.code : 500).json({
        success: false,
        message: error.message,
        error: error,
        data: null,
        resource: req.originalUrl,
      });
    }
  };

  register = async (req, res) => {
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    try {
      const { name, email, password } = req.body;
      
      if (!name || (name && name.trim().length === 0)) {
        throw new InvalidRequestError(
          400,
          "Invalid request, missing require param `name`"
        );
      }
      
      if (!email || (email && email.trim().length === 0)) {
        throw new InvalidRequestError(
          400,
          "Invalid request, missing require param `email`"
        );
      }

      if(!emailRegex.test(email)) {
        throw new InvalidRequestError(
          400,
          "Invalid request, invalid email"
        );
      }
      
      if (!password || (password && password.trim().length === 0)) {
        throw new InvalidRequestError(
          400,
          "Invalid request, missing require param `password`"
        );
      }
      
      if (password.trim().length < 8 || password.trim().length > 15) {
        throw new InvalidRequestError(
          400,
          "Invalid request, password length must be between 8-15 chars"
        );
      }

      const user = await this.authService.register({ name: name.trim(), email: email.trim(), password: password.trim() });

      return res.status(200).json({
        success: true,
        message: "Registration successful",
        data: user,
        error: null,
        resource: req.originalUrl,
      });
    } catch (error) {
      return res.status(error.code ? error.code : 500).json({
        success: false,
        message: error.message,
        error: error,
        data: null,
        resource: req.originalUrl,
      });
    }
  };

  logout = async (req, res) => {
    return res
      .clearCookie("access_token")
      .status(200)
      .json({
        success: true,
        message: "Logout successful",
        data: null,
        error: null,
        resource: req.originalUrl,
      });
  }
}

module.exports = new AuthController();
