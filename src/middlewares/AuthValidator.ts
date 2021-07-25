import { Request, Response, NextFunction } from 'express'
import { check, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

class AuthValidator {

    public static validate = () => {
        return [
            check('username').isString(),
            check('password').isLength({ min: 6 }),
            (req: Request, res: Response, next: NextFunction) => {
                const e = validationResult(req)
                if (!e.isEmpty()) {
                    return res.status(422).send({ error: e.array() })
                }
                next()
            }
        ]
    }

    public static validateToken = (req: Request, res: Response, next: NextFunction) => {
        if (!req.headers.authorization) return res.status(401).json({ message: 'Unauthorized' })

        const key: string = process.env.JWT_KEY || 'secret'
        const token: string = req.headers.authorization.split(" ")[1]

        try {
            const credential: string | object = jwt.verify(token, key)
            if (!credential) return res.status(401).json({ message: 'Invalid Token' })
            req.app.locals.credential = credential
            next()
        }
        catch (e) {
            return res.status(401).json(e)
        }
    }
}


export default AuthValidator