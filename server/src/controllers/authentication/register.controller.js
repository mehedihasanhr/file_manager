import Folder from "../../models/folder.model";
import User from "../../models/user.model";
import { commonGlobals } from "eslint-plugin-node/lib/configs/_commons";


class Register {
    constructor() {
        this.users = [];
        this.register = this.register.bind(this);
    }

    async register(req, res) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                error: true,
                message: "Please provide a name, email and password",
            })
        }

        try {

            const userExistence = new Promise((resolve, reject) => {
                User.findOne({ email }, (err, user) => {
                    if (err) return reject(new Error(err))
                    if (user) reject(new Error("User already exists"));
                    resolve();
                })
            });

            Promise.all([userExistence]).then(async () => {

                const user = await User.create({
                    name,
                    email,
                    password
                });

                if (!user) {
                    return res.status(400).json({
                        error: true,
                        message: "User not created",
                    })
                }

                // create root folder for user with name "root"
                const rootFolder = await Folder.create({
                    name: "root",
                    type: "root",
                    parent: null,
                    author: user._id,
                })

                if (rootFolder) {
                    // create default folders for user
                    await Folder.create([{
                        name: "Documents",
                        type: "documents",
                        parent: rootFolder._id,
                        author: user._id,
                    }, {
                        name: "Images",
                        type: "images",
                        parent: rootFolder._id,
                        author: user._id,
                    }, {
                        name: "Videos",
                        type: "videos",
                        parent: rootFolder._id,
                        author: user._id,
                    }, {
                        name: "Music",
                        type: "music",
                        parent: rootFolder._id,
                        author: user._id,
                    }, {
                        name: "Archives",
                        type: "archives",
                        parent: rootFolder._id,
                        autor: user._id,
                    }, {
                        name: "Compressed",
                        type: "compressed",
                        parent: rootFolder._id,
                        author: user._id,
                    }, {
                        name: "Apps",
                        type: "application",
                        parent: rootFolder._id,
                        author: user._id,
                    }, {
                        name: "Others",
                        type: "others",
                        parent: rootFolder._id,
                        author: user._id,
                    }]).then( async  res => {
                        let folders=[]

                        res.forEach(f => {
                            folders.push(f._id)
                        })

                        if(folders.length > 0){
                            rootFolder.folders = folders;
                            await rootFolder.save();
                        }

                    })
                }


                user.rootFolder = rootFolder._id;

                await user.save();

                return res.status(201).json({
                    error: false,
                    message: "User created successfully",
                });
            }).catch(async (err) => {
                return res.status(400).json({
                    error: true,
                    message: err.message,
                })
            });
        } catch (err) {
            return res.status(500).json({
                error: true,
                message: err.message,
            })
        }


    }
}

export default new Register();