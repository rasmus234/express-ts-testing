import {Role} from '../3_models/Role';
import {Guard} from '../2_sessions/Guard';
import {Resource} from '../3_models/Resource';
import {SuccessCode} from '../3_models/SuccessCode';
import {Request, Response} from "express";

class AbstractEndpoint {

    public static produceResponse(successCode: SuccessCode, minRole: Role, resource: Resource, request: Request, response: Response): Response {
        const code = Guard.deny(request, minRole);
        if (code > 0)
            return response.status(code);
        return response.status(successCode);
    }
}

export {AbstractEndpoint}
