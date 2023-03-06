import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: "",
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Folder",
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    folders: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Folder"
    },

    status: {
        type: String,
        enum: ["favorite", "trash", "archive", "normal", "shared", "favorite-shared", "trash-shared", "archive-shared", "locked"],
        default: "normal",
    }

}, {
    timestamps: true,
});


const Folder = mongoose.model.Folder || mongoose.model("Folder", folderSchema);


export default Folder;