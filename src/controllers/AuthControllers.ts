import { Request, Response } from 'express'
import PasswordHash from '../utils/PasswordHash'
import ResponseData from '../utils/ResponseData'
const db = require('../db/models')

export interface user {
    id: number,
    username: string,
    password: string,
    email?: string
}

class AuthController {
    register = async (req: Request, res: Response): Promise<Response> => {
        try {
            const user: user = req.body
            user.password = await PasswordHash.hash(user.password)
            const isCreated: user = await db.user.create(user)
            return res.status(200).json({ issucess: true, data: isCreated.username })
        }
        catch (e) {
            return res.send(e.message)
        }
    }

    login = async (req: Request, res: Response): Promise<Response> => {
        try {

            const login: user = req.body

            const user: user = await db.user.findOne({ where: { username: login.username } })

            const response = ResponseData.isSuccess(res, user)

            if (!user) return res.json(response)

            const isMatched = await PasswordHash.compare(login.password, user.password)

            if (!isMatched) return res.json(ResponseData.isSuccess(res, "username or password doesn't match"))

            let token: string = PasswordHash.generateToken(user)

            return res.send(token)

        }
        catch (e) {

            return res.status(400).json(ResponseData.isError(e, null))

        }
    }

    logout = async (req: Request, res: Response): Promise<Response> => {
        try {
            // let user : user = req.body
            // user.password = await PasswordHash.hash(user.password)

            // const useriscreated = await db.user.create(user)

            return res.status(200).json({ issucess: true, data: req.app.locals.credential })
        }
        catch (e) {
            return res.send(e.message)
        }
    }
}

export default new AuthController