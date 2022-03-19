import {AccessToken} from "./AccessToken";
import {Role} from "../3_models/Role";
import {Request} from "express";

const denyCode: number = 403;

class Guard {
    public static deny(request: Request, minRole: Role): number {
        const token: string = request.cookies.jwt;
        if (token) {
            const role: Role = AccessToken.userRole(token);
            if (role < minRole)
                return denyCode;
            return 0;
        }
        return 0;
    }
}

export {Guard}
