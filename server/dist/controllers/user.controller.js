"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _user = _interopRequireDefault(require("../models/user.model"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class userController {
  constructor() {
    this.users = [];
  }

  /* CREATE USER */
  async create(req, res) {
    const {
      name,
      email,
      password
    } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        error: true,
        message: "Please provide a name, email and password"
      });
    }
    try {
      const user = await _user.default.create({
        name,
        email,
        password
      });
      if (!user) {
        return res.status(400).json({
          error: true,
          message: "User not created"
        });
      }
      return res.status(201).json({
        error: false,
        data: user,
        message: "User created"
      });
    } catch (err) {
      console.log(err);
    }
  }
}
var _default = new userController();
exports.default = _default;