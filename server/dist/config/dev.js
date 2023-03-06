"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dev = void 0;
const dev = {
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/file-manager',
  JWT_SECRET_ACCESS_TOKEN: 'secret',
  JWT_SECRET_REFRESH_TOKEN: 'secret-REFRESH',
  ORIGINS: "http://localhost,http://localhost:3000,http://localhost:5000,http://localhost:3001"
};
exports.dev = dev;