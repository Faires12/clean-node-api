import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { makeSignUpController } from './factories/singup'
import { adaptRoute } from './adapters/express-route-adapter'
import { makeLoginController } from './factories/login'
import { adaptMiddleware } from './adapters/express-middleware-adapter'
import { makeAuthMiddleware } from './factories/auth-middlware'
import path from 'path'
import { makeAddImageController } from './factories/image/add-image'
import { makeLoadAccountImagesController } from './factories/image/load-account-images'
import { makeLoadImageController } from './factories/image/load-image'
import { makeDeleteImage } from './factories/image/delete-image'
import { makeEditImageController } from './factories/image/edit-image'

const app = express()

app.use(cors())
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}))

app.post('/signup', adaptRoute(makeSignUpController()))
app.post('/login', adaptRoute(makeLoginController()))

app.post('/image', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeAddImageController(path.resolve(__dirname, 'public'))))
app.get('/image', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeLoadAccountImagesController()))
app.get('/image/:id', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeLoadImageController()))
app.delete('/image/:id', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeDeleteImage()))
app.put('/image/:id', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeEditImageController(path.resolve(__dirname, 'public'))))


mongoose.connect('mongodb://localhost:27017/clean-api').then(() => {
    app.listen(3000, () => console.log('Conectado a porta 3000'))
})