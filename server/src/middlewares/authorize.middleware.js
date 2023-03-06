import User from "../models/user.model";
import { token } from "../utils/tokenGenerator";



export const authorize = async (req, res, next) => {
    const { authorization } = req.headers;


    if (!authorization) {
        return res.status(401).json({
            error: true,
            message: "Unauthorized",
        })
    }


    const accessToken = authorization.split("Bearer ")[1];

    if (!accessToken) {
        return res.status(401).json({
            error: true,
            message: "Unauthorized",
        })
    }



    try {
        const payload = await token.verifyAccessToken(accessToken);
        if (!payload) {
            return res.status(401).json({
                error: true,
                message: "Unauthorized",
            })
        }

        // find user by id and attach to req.user

        const exist = await User.findById(payload.id).select("-password").exec();

        if (!exist) {
            return res.status(401).json({
                error: true,
                message: "Unauthorized",
            })
        }


        req.user = {
            id: exist._id,
            name: exist.name,
            email: exist.email,
        };

        next();
    } catch (err) {
        console.log(err)
    }
}