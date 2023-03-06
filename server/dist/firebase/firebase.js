"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storage = void 0;
var _app = require("firebase/app");
var _storage = require("firebase/storage");
var _config = _interopRequireDefault(require("../config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const firebaseConfig = {
  apiKey: _config.default.FIREBASE_API_KEY,
  authDomain: _config.default.FIREBASE_AUTH_DOMAIN,
  projectId: _config.default.FIREBASE_PROJECT_ID,
  storageBucket: _config.default.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: _config.default.FIREBASE_MESSAGING_SENDER_ID,
  appId: _config.default.FIREBASE_APP_ID
};
const app = (0, _app.initializeApp)(firebaseConfig);
const storage = (0, _storage.getStorage)(app);
exports.storage = storage;