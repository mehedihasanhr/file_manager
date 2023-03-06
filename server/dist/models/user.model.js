"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* USER SCHEMA */
const userSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: ""
  },
  rootFolder: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "Folder"
  }
});

/* USER PASSWORD HASHING METHOD */
userSchema.pre("save", async function (next) {
  const user = this;
  const salt = await _bcrypt.default.genSalt(8);
  if (user.isModified("password")) {
    user.password = await _bcrypt.default.hash(user.password, salt);
  }
  next();
});

/* USER PASSWORD VERIFIED METHOD */
userSchema.methods.verifyPassword = async function (password) {
  const user = this;
  return new Promise((resolve, reject) => {
    _bcrypt.default.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      if (!isMatch) {
        return reject(false);
      }
      resolve(true);
    });
  });
};
const User = _mongoose.default.model("User", userSchema);
var _default = User;
exports.default = _default;