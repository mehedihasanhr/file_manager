"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadFile = void 0;
const uploadFile = async (req, res) => {
  try {
    const file = req.files[0];
    console.log(file);
  } catch (err) {
    console.log(err);
  }
};
exports.uploadFile = uploadFile;