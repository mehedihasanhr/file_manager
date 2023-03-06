"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authorize = void 0;
var _user = _interopRequireDefault(require("../models/user.model"));
var _tokenGenerator = require("../utils/tokenGenerator");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const authorize = async (req, res, next) => {
  const {
    authorization
  } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      error: true,
      message: "Unauthorized"
    });
  }
  const accessToken = authorization.split("Bearer ")[1];
  if (!accessToken) {
    return res.status(401).json({
      error: true,
      message: "Unauthorized"
    });
  }
  try {
    const payload = await _tokenGenerator.token.verifyAccessToken(accessToken);
    if (!payload) {
      return res.status(401).json({
        error: true,
        message: "Unauthorized"
      });
    }

    // find user by id and attach to req.user

    const exist = await _user.default.findById(payload.id).select("-password").exec();
    if (!exist) {
      return res.status(401).json({
        error: true,
        message: "Unauthorized"
      });
    }
    req.user = {
      id: exist._id,
      name: exist.name,
      email: exist.email
    };
    next();
  } catch (err) {
    console.log(err);
  }
};
exports.authorize = authorize;