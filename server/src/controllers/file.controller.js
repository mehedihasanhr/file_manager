import File from '../models/file.model';


class FileController {
    constructor() {
        this.files = [];
    }

    /* GET ALL FILES */
    async getAllFiles(req, res) {
        const { folderId } = req.query;
        try {
            const files = await File.find({ parent: folderId }).exec();
            if (files) {
                return res.status(200).json({
                    error: false,
                    data: files,
                    total: files.length,
                })
            }
        } catch (err) {
            console.log(err)
        }
    }

    /* GET FILE BY ID */
    async getFileById(req, res) {
        if (!req.params.id) {
            return res.status(400).json({
                error: true,
                message: "Please provide a file id",
            })
        }
        try {
            const file = await File.findById(req.params.id).exec();
            if (file) {
                return res.status(200).json({
                    error: false,
                    data: file,
                })
            }
        } catch (err) {
            console.log(err)
        }
    }


    /* CREATE FILE */
    async createFile(req, res) {
        const { thumbnail, title, size, ext, parent, download_path, author } = req.body;
        if (!title || !ext || !download_path || !author || !parent || !size || !thumbnail) {
            return res.status(400).json({
                error: true,
                message: "Please provide a title, size, ext, parent, download_path, author",
            })
        }

        try {
            const file = await File.create({
                title,
                size,
                ext,
                parent,
                download_path,
                author,
                thumbnail
            });

            if (!file) {
                return res.status(400).json({
                    error: true,
                    message: "File not created",
                })
            }


            return res.status(201).json({
                error: false,
                data: file,
                message: "File created successfully",
            });

        } catch (err) {
            console.log(err);
        }
    }

    /* UPDATE FILE */
    async updateFile(req, res) {
        const { thumbnail, title, size, ext, parent, download_path, author } = req.body;
        if (!title || !ext || !download_path || !author || !parent || !size || !thumbnail) {
            return res.status(400).json({
                error: true,
                message: "Please provide a title, size, ext, parent, download_path, author",
            })
        }


        try {
            const file = await File.findByIdAndUpdate(req.params.id, {
                title,
                size,
                ext,
                parent,
                download_path,
                author,
                thumbnail
            }, { new: true });

            if (!file) {
                return res.status(400).json({
                    error: true,
                    message: "File not updated",
                })
            }

            return res.status(200).json({
                error: false,
                data: file,
                message: "File updated successfully",
            });

        } catch (err) {
            console.log(err);
        }
    }

    /* DELETE FILE */

    async deleteFile(req, res) {
        const { fileId } = req.params;
        if (!fileId) {
            return res.status(400).json({
                error: true,
                message: "Please provide a file id",
            })
        }

        try {
            const file = await FindByIdAndRemove(fileId).exec();
            if (!file) {
                return res.status(400).json({
                    error: true,
                    message: "File not deleted",
                })
            }

            return res.status(200).json({
                error: false,
                data: file,
                message: "File deleted successfully",
            });

        } catch (err) {
            console.log(err);
        }
    }


}



export default new FileController();