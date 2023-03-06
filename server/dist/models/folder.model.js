"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const folderSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: ""
  },
  parent: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "Folder"
  },
  author: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "User"
  },
  folders: {
    type: [_mongoose.default.Schema.Types.ObjectId],
    ref: "Folder"
  },
  status: {
    type: String,
    enum: ["favorite", "trash", "archive", "normal", "shared", "favorite-shared", "trash-shared", "archive-shared", "locked"],
    default: "normal"
  }
}, {
  timestamps: true
});
const Folder = _mongoose.default.model.Folder || _mongoose.default.model("Folder", folderSchema);
var _default = Folder;
exports.default = _default;