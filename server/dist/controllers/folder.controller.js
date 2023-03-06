"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _file = _interopRequireDefault(require("../models/file.model"));
var _folder = _interopRequireDefault(require("../models/folder.model"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class FolderController {
  constructor() {
    this.folders = [];
  }

  /**************************************/
  /********* GET FOLDER BY ID *******/
  /**************************************/
  async getFolderById(req, res) {
    const {
      id
    } = req.params;
    if (!id) {
      return res.status(400).json({
        error: true,
        message: "Please provide a folder id"
      });
    }
    try {
      const folder = await _folder.default.findOne({
        _id: id
      }).populate({
        path: "folders",
        select: 'name type parent author status'
      }).exec();
      const file = await _file.default.find({
        parent: id
      }).exec();
      if (!folder) {
        return res.status(404).json({
          error: true,
          message: "Folder not found"
        });
      }
      return res.status(200).json({
        data: folder,
        message: "Folder found"
      });
    } catch (err) {
      console.log(err);
    }
  }

  /**************************************/
  /********* CREATE FOLDER *******/
  /**************************************/

  async createFolder(req, res) {
    const {
      name,
      type,
      parent
    } = req.body;
    if (!name) {
      return res.status(400).json({
        error: true,
        message: "Please provide a name"
      });
    }
    try {
      // get parent folder if it exists
      const root = await _folder.default.findOne({
        _id: parent
      }).exec();

      // check if parent folder exists and return error if not
      if (!root) {
        return res.status(400).json({
          error: true,
          message: "Parent folder not found"
        });
      }
      console.log(req.user);
      // check if user already logged in
      if (!req.user.id) {
        return res.status(400).json({
          error: true,
          message: "User not found"
        });
      }

      // create folder and save to database
      const folder = await _folder.default.create({
        name,
        type,
        parent,
        author: req.user.id
      });

      // add folder to parent folder
      if (root && root._id) {
        root.folders.push(folder._id);
        await root.save();
      }

      // return success message
      if (folder) {
        return res.status(201).json({
          folder,
          message: "Folder created"
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  /**************************************/
  /********* RENAME FOLDER *******/
  /**************************************/

  async renameFolder(req, res) {
    try {
      // folder name from request body
      const {
        name
      } = req.body;

      /*
      * check if folder name is provided
      * return error if not
      */

      if (!name) {
        return res.status(400).json({
          error: true,
          message: "Please provide a folder name"
        });
      }

      // get folder id from request params
      const {
        id
      } = req.params;

      /*
      * check if folder id is provided
      * return error if not
      */
      if (!id) {
        return res.status(400).json({
          error: true,
          message: "Please provide a folder id"
        });
      }

      /*
      * find folder by id and update name
      */

      await _folder.default.findByIdAndUpdate(id, {
        name
      }, {
        new: true
      }).exec().then(folder => {
        return res.status(200).json({
          data: folder,
          message: "Folder renamed successfully"
        });
      }).catch(err => {
        return res.status(500).json({
          error: true,
          message: "Something went wrong"
        });
      });
    } catch (err) {
      return res.status(500).json({
        error: true,
        message: "Something went wrong"
      });
    }
  }

  /**************************************/
  /********* CHANGE FOLDER STATUS *******/
  /**************************************/

  async changeFolderStatus(req, res) {
    try {
      /*
      * get folder status from request body
      * return error if not provided
      */
      const {
        status
      } = req.body;
      if (!status) {
        return res.status(400).json({
          error: true,
          message: "Please provide a status"
        });
      }

      /*
      * get folder id from request params
      * return error if not provided
      */

      const {
        id
      } = req.params;
      if (!id) {
        return res.status(400).json({
          error: true,
          message: "Please provide a folder id"
        });
      }

      /*
      * check if folder exists
      * return error if not
      */

      await _folder.default.findByIdAndUpdate(id, {
        status
      }, {
        new: true
      }).exec().then(result => {
        /* folder status response message */
        const statusMessage = {
          "trash": "Folder moved to trash",
          "favorite": "Folder added to favorites",
          "archive": "Folder archived",
          "normal": "Folder status changed to normal"
        };
        return res.status(200).json({
          data: result,
          message: statusMessage[status]
        });
      }).catch(err => {
        console.log(err);
        return res.status(500).json({
          error: true,
          message: "Something went wrong"
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: true,
        message: err.message
      });
    }
  }

  /**************************************/
  /********* Trash Folders *******/
  /**************************************/

  async trashFolders(req, res) {
    try {
      /* get all trash folder from database for current user */
      await _folder.default.find({
        author: req.user.id,
        status: "trash"
      }).exec().then(folders => {
        return res.status(200).json({
          data: folders,
          message: "Trash folders fetched successfully"
        });
      }).catch(err => {
        return res.status(500).json({
          error: true,
          message: err.message
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: true,
        message: err.message
      });
    }
  }

  /**************************************/
  /********* Favorite Folders *******/
  /**************************************/

  async favoriteFolders(req, res) {
    try {
      /* get all trash folder from database for current user */
      await _folder.default.find({
        author: req.user.id,
        status: "favorite"
      }).exec().then(folders => {
        return res.status(200).json({
          data: folders,
          message: "Favorite folders fetched successfully"
        });
      }).catch(err => {
        return res.status(500).json({
          error: true,
          message: err.message
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: true,
        message: err.message
      });
    }
  }

  /**************************************/
  /********* Delete *********************/
  /**************************************/

  async deleteFolder(req, res) {
    try {
      /*
      * Get id from params
      */

      const {
        id
      } = req.params;

      /*
      * delete folder by id and all sub folders and files
      */

      await _folder.default.findByIdAndDelete(id).exec().then(async folder => {
        await _folder.default.deleteMany({
          parent: id
        }).exec();
        await _file.default.deleteMany({
          parent: id
        }).exec();
        return res.status(200).json({
          data: folder,
          message: "Folder deleted successfully"
        });
      }).catch(err => {
        return res.status(500).json({
          error: true,
          message: err.message
        });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: true,
        message: err.message
      });
    }
  }
}
var _default = new FolderController();
exports.default = _default;