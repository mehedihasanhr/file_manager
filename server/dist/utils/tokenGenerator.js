"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.token = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _config = _interopRequireDefault(require("../config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  JWT_SECRET_ACCESS_TOKEN,
  JWT_SECRET_REFRESH_TOKEN
} = _config.default;
const token = {
  // access token
  accessToken: payload => {
    return new Promise((resolve, reject) => {
      _jsonwebtoken.default.sign(payload, JWT_SECRET_ACCESS_TOKEN, {
        expiresIn: '5m'
      }, (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  },
  // verify access token
  verifyAccessToken: token => {
    return new Promise((resolve, reject) => {
      _jsonwebtoken.default.verify(token, JWT_SECRET_ACCESS_TOKEN, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  },
  // refresh token
  refreshToken: payload => {
    return new Promise((resolve, reject) => {
      _jsonwebtoken.default.sign(payload, JWT_SECRET_REFRESH_TOKEN, {
        expiresIn: '7d'
      }, (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  },
  // verify access token
  verifyRefreshToken: token => {
    return new Promise((resolve, reject) => {
      _jsonwebtoken.default.verify(token, JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  }
};
exports.token = token;