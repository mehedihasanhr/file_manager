"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _folder = _interopRequireDefault(require("../controllers/folder.controller"));
var _authorize = require("../middlewares/authorize.middleware");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = (0, _express.Router)();
router.post('/create', _authorize.authorize, _folder.default.createFolder);
router.get('/:id', _authorize.authorize, _folder.default.getFolderById);
router.post("/update/rename/:id", _authorize.authorize, _folder.default.renameFolder);
router.put("/update/status/:id", _authorize.authorize, _folder.default.changeFolderStatus);
router.patch("/update/status/:id", _authorize.authorize, _folder.default.changeFolderStatus);
router.delete("/delete/:id", _authorize.authorize, _folder.default.deleteFolder);
router.get("/trash/folders", _authorize.authorize, _folder.default.trashFolders);
router.get("/favorite/folders", _authorize.authorize, _folder.default.favoriteFolders);
var _default = router;
exports.default = _default;