"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _auth = _interopRequireDefault(require("./auth.routes"));
var _file = _interopRequireDefault(require("./file.routes"));
var _folder = _interopRequireDefault(require("./folder.routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = (0, _express.Router)();
router.use('/auth', _auth.default);
router.use('/folder', _folder.default);
router.use('/files', _file.default);
var _default = router;
exports.default = _default;