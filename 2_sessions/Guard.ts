import {AccessToken} from "./AccessToken";
import {Role} from "../3_models/Role";
import {HTTPHeader} from "./HTTPHeader"

const denyCode: number = 403;

class Guard {
    public static deny(request: any, minRole: Role): number {
        const token: string = HTTPHeader.getToken(request);
        if (token) {
            const role: Role = AccessToken.userRole(token);
            if (role <= minRole)
                return denyCode;
            return 0;
        }
        return 0;
    }
}

export {Guard}
