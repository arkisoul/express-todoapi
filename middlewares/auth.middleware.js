const jwt = require('jsonwebtoken');

/**
 * @name AuthMiddleware
 * @description verify presence of auth token in access_token cookie
 * @param {RequestObject} req
 * @param {ResponseObject} res
 * @param {NextFunction} next
 * @returns
 */
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Missing authorization data",
          data: null,
          error: null,
          resource: req.originalUrl,
        });
    }

    const decodedData = await jwt.verify(token, process.env.JWT_KEY);
    req.user = { userId: decodedData.userId };

    return next();
  } catch (error) {
    return res
      .status(401)
      .json({
        success: false,
        message: error.message,
        data: null,
        error: error,
        resource: req.originalUrl,
      });
  }
};

module.exports = auth;
