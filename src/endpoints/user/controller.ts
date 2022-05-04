import { Response } from "express";
import Controller from "../Controller";
import jwt from 'jsonwebtoken'
import { AuthenticationRequestBody, CreateUserRequestBody } from "./types";
import User from './model'
import bcrypt from 'bcrypt'
import { AuthenticatedRequest, Request } from "../../types";

export class UserController extends Controller {

    /**
     *  Check if user already exists
     *  If doesn't exist, hash password and create
     */
    public createUser = async (req: Request<CreateUserRequestBody>, res: Response) => {
        
        try {
            const { email, password } = req.body

            const user = await User.findOne({ email })

            if (user) return this.notFound(res, "User with email already exists.")

            const hashed = bcrypt.hashSync(password, 10)

            let newUser = await User.create({ email, password: hashed })

            return newUser ? this.created(res) : this.fail(res, "Failed to create user.")

        } catch (error) {
            console.log(error)
            return this.fail(res, "Could not create user.")
        }

    }

    /**
     * Authenticate User
     */
    public authenticate = async (req: Request<AuthenticationRequestBody>, res: Response) => {

        try {
            const { email, password } = req.body

            const user = await User.findOne({ email })
            
            if (!user) return this.notFound(res, "Can't find user with these credentials.")

            const match = bcrypt.compareSync(password, user.password)

            if (match) {

                //Create token that expires in 1 hour (3600 seconds)
                const token = jwt.sign({ data: email }, process.env.TOKEN, { expiresIn: 3600 })

                return this.ok(res, { token, expiresIn: 3600 })
            }

            return this.unauthorized(res) 

        } catch (error) {
            console.log(error)
            return this.fail(res, "Something went wrong.")
        }

    }

    /**
     * Displays message with email retrieved via JWT payload.
     */
    public helloWorld = async (req: AuthenticatedRequest, res: Response) => {


        return res.json("Hello World! Your email: " + req.email)
    }

}