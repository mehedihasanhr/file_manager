"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class Logout {
  constructor() {
    this.logout = this.logout.bind(this);
  }
  async logout(req, res) {
    try {
      res.clearCookie('_frtoken');
      res.status(200).json({
        error: false,
        message: 'logged out'
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Internal server error'
      });
    }
  }
}
var _default = new Logout();
exports.default = _default;