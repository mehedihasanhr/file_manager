"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const fileSchema = new _mongoose.default.Schema({
  title: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  ext: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  parent: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "Folder",
    required: true
  },
  download_path: {
    type: String,
    required: true
  },
  starred: {
    type: Boolean,
    default: false
  },
  looked: {
    type: Boolean,
    default: false
  },
  author: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, {
  timestamps: true
});
const File = _mongoose.default.model("File", fileSchema);
var _default = File;
exports.default = _default;