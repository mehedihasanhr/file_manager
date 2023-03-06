"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _login = _interopRequireDefault(require("../controllers/authentication/login.controller"));
var _logout = _interopRequireDefault(require("../controllers/authentication/logout.controller"));
var _refresh = _interopRequireDefault(require("../controllers/authentication/refresh.controller"));
var _register = _interopRequireDefault(require("../controllers/authentication/register.controller"));
var _auth = _interopRequireDefault(require("../controllers/authentication/auth.controller"));
var _authorize = require("../middlewares/authorize.middleware");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = (0, _express.Router)();
router.get('/me', _authorize.authorize, _auth.default.me);
router.post("/register", _register.default.register);
router.post("/login", _login.default.login);
router.get("/refresh", _refresh.default.refresh);
router.get("/logout", _logout.default.logout);
var _default = router;
exports.default = _default;