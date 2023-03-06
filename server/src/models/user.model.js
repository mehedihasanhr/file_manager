import bcrypt from "bcrypt";
import mongoose from "mongoose";


/* USER SCHEMA */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "",
    },

    rootFolder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Folder",
    }
});

/* USER PASSWORD HASHING METHOD */
userSchema.pre("save", async function (next) {
    const user = this;
    const salt = await bcrypt.genSalt(8);
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, salt);
    }
    next();
})


/* USER PASSWORD VERIFIED METHOD */
userSchema.methods.verifyPassword = async function (password) {
    const user = this;
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return reject(err);
            }
            if (!isMatch) {
                return reject(false);
            }
            resolve(true);
        })
    });
}


const User = mongoose.model("User", userSchema);

export default User;