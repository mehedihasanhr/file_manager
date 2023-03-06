import mongoose from 'mongoose';


const fileSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    ext: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Folder",
        required: true,
    },
    download_path: {
        type: String,
        required: true,
    },
    starred: {
        type: Boolean,
        default: false,
    },
    looked: {
        type: Boolean,
        default: false,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, {
    timestamps: true,
});



const File = mongoose.model("File", fileSchema);

export default File;