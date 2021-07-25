import { Response } from 'express'
import { user } from '../controllers/AuthControllers'

class ResponseData {
    public static isSuccess(res: Response, data: any) {
        const user: user = data
        return { isSuccess: res.statusCode, data: user, message: res.statusMessage }
    }

    public static isError(error: Error, data: any) {
        return { isSuccess: false, data: error.name, message: error.message }
    }
}

export default ResponseData