import { NextFunction } from 'express'

export const passToExpressError = (err: any, next: NextFunction) => {
    if (!err.statusCode) {
        err.statusCode = 500
        console.log(err.message)
        err.message = 'Could not process the request, check inputs and try again'
    }
    next(err)
}
