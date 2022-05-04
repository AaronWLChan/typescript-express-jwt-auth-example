import { Response } from "express";

export default abstract class Controller {

    protected static jsonResponse(res: Response, code: number, message: string){
        return res.status(code).json({message})
    }

    protected ok(res: Response, data?: any){

        if (data){
            res.type("application/json")
            return res.status(200).json(data)
        }

        return res.sendStatus(200)
    }

    protected created (res: Response) {
        return res.sendStatus(201);
      }

    protected clientError (res: Response, message?: string) {
      return Controller.jsonResponse(res, 400, message ? message : 'Unauthorized');
    }

    protected unauthorized (res: Response, message?: string) {
      return Controller.jsonResponse(res, 401, message ? message : 'Unauthorized');
    }

    protected forbidden (res: Response, message?: string) {
      return Controller.jsonResponse(res, 403, message ? message : 'Forbidden');
    }

    protected notFound (res: Response, message?: string) {
      return Controller.jsonResponse(res, 404, message ? message : 'Not found');
    }

    protected conflict (res: Response, message?: string) {
      return Controller.jsonResponse(res, 409, message ? message : 'Conflict');
    }

    protected tooMany (res: Response, message?: string) {
      return Controller.jsonResponse(res, 429, message ? message : 'Too many requests');
    }

    protected fail (res: Response, error: Error | string) {
        console.log(error);
        return res.status(500).json({
          message: error.toString()
        })
      }


}