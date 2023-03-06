import User from "../../models/user.model";
import { token } from '../../utils/tokenGenerator';


class LoginController {
    constructor() {
        this.users = [];
    }


    /* LOGIN USER */

    async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: true,
                message: "credentials not provided",
            })
        }

        try {
            const user = await User.findOne({ email }).exec();

            if (!user) {
                return res.status(401).json({
                    error: true,
                    message: "Your credentials are incorrect",
                })
            }


            const isMatch = await user.verifyPassword(password);

            if (!isMatch) {
                return res.status(401).json({
                    error: true,
                    message: "Your credentials are incorrect",
                })
            }

            const tokenPayload = {
                id: user._id,
                name: user.name
            }

            const accessToken = await token.accessToken(tokenPayload);
            const refreshToken = await token.refreshToken(tokenPayload);

            // SAVE REFRESH TOKEN TO COOKIE
            res.cookie("_frtoken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                expires: new Date(Date.now() + 604800000) // 1 week
            })


            // CREATE USER DATA WITHOUT PASSWORD AND REFRESH TOKEN
            const data = {
                id: user._id,
                name: user.name,
                email: user.email,
                rootFolder: user.rootFolder,
                token: accessToken,
            }


            return res.status(200).json({
                error: false,
                data,
                message: "User logged in",
            });



        } catch (err) {
            console.log(err)
        }

    }
}


export default new LoginController();