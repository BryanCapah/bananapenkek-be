import express, { Application, Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'

import Auth from './routers/Auth'
import AuthValidator from './middlewares/AuthValidator'

dotenv.config()

const app: Application = express()
app.use(cors({ origin: process.env.HOST }))
app.use(compression())
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.raw())
app.listen(process.env.PORT, () => console.log('server is running'))

//Middleware

//Route
app.use('/auth', AuthValidator.validate(), Auth)