"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _user = _interopRequireDefault(require("../../models/user.model"));
var _tokenGenerator = require("../../utils/tokenGenerator");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class authRefresh {
  constructor() {
    this.users = [];
  }

  /* REFRESH TOKEN */

  async refresh(req, res) {
    const refreshToken = req.cookies._frtoken;
    if (!refreshToken) {
      return res.status(401).json({
        error: true,
        message: "session expired or not logged in"
      });
    }
    try {
      const decoded = await _tokenGenerator.token.verifyRefreshToken(refreshToken);
      const user = await _user.default.findById(decoded.id).exec();
      if (!user) {
        return res.status(404).json({
          error: true,
          message: "user not found"
        });
      }
      const tokenPayload = {
        id: user._id,
        name: user.name
      };
      const accessToken = await _tokenGenerator.token.accessToken(tokenPayload);
      const rToken = await _tokenGenerator.token.refreshToken(tokenPayload);

      // SAVE REFRESH TOKEN TO COOKIE
      res.cookie("_frtoken", rToken, {
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
      console.log("refresh called successfully");
      return res.status(200).json({
        error: false,
        message: "token refreshed",
        data
      });
    } catch (error) {
      return res.status(401).json({
        error: true,
        message: "session expired or not logged in"
      });
    }
  }
}
var _default = new authRefresh();
exports.default = _default;