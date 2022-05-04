import { NextFunction, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { AuthenticatedRequest } from '../types'

/**
 * Extend JWTPayload interface to include data
 */
declare module "jsonwebtoken" {
    export interface JwtPayload {
        data?: string
    }
}

/**
 * Authenticates JWT token
 * JSONWebToken module will handle expiry and invalid tokens for you
 */
export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction){

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN, (err, decoded) => {

        if (err) {
            console.log("Error verifying JWT: " + err)
            return res.sendStatus(403)
        }

        //Cast as JwtPayload to access attributes
        decoded = decoded as JwtPayload

        req.email = decoded.data

        next()

    })

}