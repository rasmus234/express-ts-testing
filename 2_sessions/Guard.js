"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guard = void 0;
const AccessToken_1 = require("./AccessToken");
const HTTPHeader_1 = require("./HTTPHeader");
const denyCode = 403;
class Guard {
    static deny(request, minRole) {
        const token = HTTPHeader_1.HTTPHeader.getToken(request);
        if (token) {
            const role = AccessToken_1.AccessToken.userRole(token);
            if (role <= minRole)
                return denyCode;
            return 0;
        }
        return 0;
    }
}
exports.Guard = Guard;
