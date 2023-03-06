"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _dev = require("./dev");
var _prod = require("./prod");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const env = process.env.NODE_ENV || 'development';
const defaultConfig = {
  PORT: 5000,
  MONGO_URI: process.env.MONGO_URI,
  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID: process.env.FIREBASE_APP_ID
};
let config = {};
if (env === 'development') {
  config = _dev.dev;
} else if (env === 'production' || env === 'prod') {
  config = _prod.prod;
}
var _default = _lodash.default.merge(defaultConfig, config);
exports.default = _default;