"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _user = _interopRequireDefault(require("../../models/user.model"));
var _tokenGenerator = require("../../utils/tokenGenerator");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class LoginController {
  constructor() {
    this.users = [];
  }

  /* LOGIN USER */

  async login(req, res) {
    const {
      email,
      password
    } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        error: true,
        message: "credentials not provided"
      });
    }
    try {
      const user = await _user.default.findOne({
        email
      }).exec();
      if (!user) {
        return res.status(401).json({
          error: true,
          message: "Your credentials are incorrect"
        });
      }
      const isMatch = await user.verifyPassword(password);
      if (!isMatch) {
        return res.status(401).json({
          error: true,
          message: "Your credentials are incorrect"
        });
      }
      const tokenPayload = {
        id: user._id,
        name: user.name
      };
      const accessToken = await _tokenGenerator.token.accessToken(tokenPayload);
      const refreshToken = await _tokenGenerator.token.refreshToken(tokenPayload);

      // SAVE REFRESH TOKEN TO COOKIE
      res.cookie("_frtoken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(Date.now() + 604800000) // 1 week
      });

      // CREATE USER DATA WITHOUT PASSWORD AND REFRESH TOKEN
      const data = {
        id: user._id,
        name: user.name,
        email: user.email,
        rootFolder: user.rootFolder,
        token: accessToken
      };
      return res.status(200).json({
        error: false,
        data,
        message: "User logged in"
      });
    } catch (err) {
      console.log(err);
    }
  }
}
var _default = new LoginController();
exports.default = _default;