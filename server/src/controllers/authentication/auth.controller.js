import UserModel from "../../models/user.model";

class AuthInfoController {
    constructor() {
        this.me = this.me.bind(this)
    }

    async me(req, res){
        try{
            if(req.user.id){
                 await UserModel.findById(req.user.id).select('-password -__v').exec().then((auth)=>{
                     if(auth){
                         return res.status(200).json({auth})
                     }
                 }).catch(err => new Error(err))
            }
        }catch(e){
            console.log(e);
            return res.status(500).json({
                message: e.message
            })
        }
    }
}


export default new AuthInfoController()