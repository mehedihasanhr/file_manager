"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prod = void 0;
const prod = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET_ACCESS_TOKEN: process.env.JWT_SECRET_ACCESS_TOKEN,
  JWT_SECRET_REFRESH_TOKEN: process.env.JWT_SECRET_REFRESH_TOKEN,
  ORIGINS: process.env.ORIGINS
};
exports.prod = prod;