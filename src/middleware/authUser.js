import { User } from "../models/usersModel.js"
import jwt from "jsonwebtoken"

export const authUser = async( req, res,next ) => {
    const header = req.headers["authorization"]

    const token = header && header.split(" ")[1]
    if(token == null){
        return res.status(401).json({
            error : "Unauthorize"
        })
    }else{
        const user = await User.findOne({token : token})
        jwt.verify(token, process.env.ACCES_TOKEN, (err) => {
            if(err){
                return res.sendStatus(403)
            }
        })
        if(!user){
            return res.status(401).json({
                error : "Unauthorize"
            }).end()
        }else{
            req.user = user
            next()
        }
    }
}