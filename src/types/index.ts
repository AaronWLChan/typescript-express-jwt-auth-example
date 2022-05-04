import { ParamsDictionary, Query, Request as ExpressRequest } from 'express-serve-static-core'

/**
 * Attaches email to a authenticated request. Can then be used to fetch User details if needed.
 * 
 * Omits ResBody type.
 */
export interface AuthenticatedRequest<ReqBody = ParamsDictionary, ReqParams = any, ReqQuery = Query> 
    extends ExpressRequest<ReqParams, any, ReqBody, ReqQuery>{
        email?: string
    }

/**
 * Basic request.
 * 
 * Omits ResBody type.
 */
export interface Request<ReqBody = ParamsDictionary, ReqParams = any, ReqQuery = Query> 
    extends ExpressRequest<ReqParams, any, ReqBody, ReqQuery>{}