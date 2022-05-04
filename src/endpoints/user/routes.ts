import { Router } from "express";
import { authenticateToken } from "../../jwt";
import { UserController } from "./controller";

const router = Router()

const controller = new UserController()

router.post("/new", controller.createUser)

router.post("/authenticate", controller.authenticate)

router.get("/hello", authenticateToken, controller.helloWorld)


export default router




