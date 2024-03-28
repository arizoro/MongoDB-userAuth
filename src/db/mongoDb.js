import mongoose from "mongoose"

export const config = async(url) => {
    try {
        await mongoose.connect(url)
        console.log('Connect to database')
    } catch (error) {
        console.error(error)
    }
}
