import User from "../models/user.model";


class userController {
    constructor() {
        this.users = [];
    }


    /* CREATE USER */
    async create(req, res) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                error: true,
                message: "Please provide a name, email and password",
            })
        }

        try {
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

            return res.status(201).json({
                error: false,
                data: user,
                message: "User created",
            });
        } catch (err) {
            console.log(err)
        }


    }

}



export default new userController();