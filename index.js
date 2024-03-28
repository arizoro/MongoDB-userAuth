import express from 'express'
import { config } from './src/db/mongoDb.js'
import { errorMiddleware } from './src/middleware/errorMiddleware.js'
import { publicApi } from './src/router/publicApi.js'
import dotenv from 'dotenv'
import { api } from './src/router/api.js'


const app = express()
app.use(express.json())

dotenv.config()

config('mongodb://127.0.0.1:27017/ReeShop')

app.use(publicApi)
app.use(api)

app.use(errorMiddleware)

app.listen(3000, () => {
    console.log('Server running on Port http://127.0.0.1:3000')
})



