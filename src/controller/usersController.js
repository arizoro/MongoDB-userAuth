import { RessponseError } from "../error/error.js"
import { User } from "../models/usersModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const register = async(req, res, next) => {
    try {
        const data = req.body
        data.password = await bcrypt.hash(data.password, 10)
        const userData = new User(data)
        const{email} = userData
        const userEXist = await User.findOne({email})

        if(userEXist){
            throw new RessponseError(404, "User already axist")
        }

        const result = await userData.save()
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const login = async(req,res,next) => {
    try {
        const{email, password} = req.body
        const userLogin = await User.findOne({email : email})

        if(!userLogin){
            throw new RessponseError(404, " User is not found")
        }

        const passwordValid = await bcrypt.compare(password , userLogin.password)
        if(!passwordValid){
            throw new RessponseError(404, "Username or pasword invalid")
        }

        const emailUser = userLogin.email
        const passwordUser = userLogin.password

        const accesToken = jwt.sign({emailUser, passwordUser}, process.env.ACCES_TOKEN )

        const result = await User.findOneAndUpdate(
        {   email : emailUser,
            password : passwordUser
        },
        {token : accesToken},
        { new : true})

        return res.status(200).json({
            token : result.token
        })
    } catch (error) {
        next(error)
    }
}

const get = async (req, res, next) => {
    try {
        const user = req.user
        const findUser = await User.findById({_id : user._id},{
            password : 0,
            token : 0
        })

        if(!findUser){
            throw new RessponseError(404, "User is not found")
        }

        return res.status(200).json({
            data : findUser            
        })
    } catch (error) {
        next(error)
    }
}

const update = async(req, res, next) => {
    try {
        const user = req.user
        const request = req.body
        const data = {
            first_name : request.first_name,
            last_name : request.last_name,
            role : request.role
        }

        if(request.address){
            data.address = []
            data.address.push({
                country : request.address.country,
                city : request.address.city,
                street : request.address.street,
                phone : request.address.phone
            })
        }

        if(request.password ){
            request.password = await bcrypt.hash(request.password, 10)
            data.password = request.password
        }
        const userExist = await User.updateOne({_id : user._id},data,{new : true})
        return res.status(200).json({
            data : userExist
        })
    } catch (error) {
        next(error)
    }
}

const logout = async(req, res, next) => {
    try {
        const user = req.user
        await User.findOneAndUpdate({_id : user._id},{
            token : null
        })
        res.status(200).json({
            data : "Ok"
        })
    } catch (error) {
        next(error)
    }
}

export default {
    register,
    get,
    login,
    update,
    logout
}