"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _user = _interopRequireDefault(require("../../models/user.model"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class AuthInfoController {
  constructor() {
    this.me = this.me.bind(this);
  }
  async me(req, res) {
    try {
      if (req.user.id) {
        await _user.default.findById(req.user.id).select('-password -__v').exec().then(auth => {
          if (auth) {
            return res.status(200).json({
              auth
            });
          }
        }).catch(err => new Error(err));
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: e.message
      });
    }
  }
}
var _default = new AuthInfoController();
exports.default = _default;