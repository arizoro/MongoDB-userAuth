import { RessponseError } from "../error/error.js"

export const validate = async(schema , request) => {
    const result = schema.validate(request)
    if(result.error){
        throw new RessponseError(400, result.error.message)
    }else{
        return result.value
    }
}